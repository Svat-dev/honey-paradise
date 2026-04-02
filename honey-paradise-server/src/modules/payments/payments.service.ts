import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { EnumTransactionStatus } from "@prisma/client"
import { isUUID } from "class-validator"
import type {
	ConfirmationRedirectResponse,
	CreatePaymentRequest,
	PaymentNotificationEvent
} from "nestjs-yookassa"
import {
	ConfirmationEnum,
	CurrencyEnum,
	LocaleEnum,
	NotificationEventEnum,
	NotificationTypeEnum,
	PaymentMethodsEnum
} from "nestjs-yookassa"
import { YookassaService } from "nestjs-yookassa/dist/yookassa.service"
import { PrismaService } from "src/core/prisma/prisma.service"
import { isDev, success } from "src/shared/lib/common/utils"
import { fullPaymentOutput } from "src/shared/lib/prisma/outputs/payments.outputs"
import type { DefaultResponse } from "src/shared/lib/response/default.res"
import { EnumClientRoutes } from "src/shared/types/client/enums.type"
import { NotificationGateway } from "src/shared/websockets/notifications.gateway"

import {
	defaultPaymentsQuery,
	type GetAllPaymentsQueryDto
} from "./dto/get-all-payments.dto"
import type { GetAllPaymentsResponse } from "./response/get-all-payments.res"

@Injectable()
export class PaymentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly config: ConfigService,
		private readonly yookassaService: YookassaService,
		private readonly notificationSocket: NotificationGateway
	) {}

	async getPaymentsByUser(
		userId: string,
		query: GetAllPaymentsQueryDto
	): Promise<GetAllPaymentsResponse> {
		try {
			const { type, field, status, page, per_page, q } = {
				...defaultPaymentsQuery,
				...query
			}

			const limit = page * per_page
			const offset = (page - 1) * per_page

			const enumStatuses = Object.values(EnumTransactionStatus)
			const statuses = status.map(i => enumStatuses[i] ?? undefined)

			const payments = await this.prisma.transaction.findMany({
				where: {
					userId,
					OR: [
						{ id: isUUID(q, 4) ? q : undefined },
						{
							status: { in: statuses },
							OR: [{ cardF6: { contains: q } }, { cardL4: { contains: q } }]
						}
					]
				},
				select: fullPaymentOutput,
				orderBy: { [field]: type },
				skip: offset,
				take: limit
			})

			const result = payments.map<any>(
				({ cardF6, cardL4, cardType, method, ...item }) => ({
					...item,
					method: {
						type: method as PaymentMethodsEnum,
						card:
							method === PaymentMethodsEnum.BANK_CARD
								? {
										type: cardType,
										number: `${cardF6}******${cardL4}`
									}
								: null
					}
				})
			)

			return {
				payments: result,
				length: result.length
			}
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException(
				"Error while getting all payments!"
			)
		}
	}

	async createPayment(
		id: { order: string; index: number; user: string },
		amount: { usd: number; rub: number },
		locale: string
	): Promise<string> {
		const payment = await this.prisma.transaction.create({
			data: {
				amount: amount.usd,
				order: { connect: { id: id.order } },
				user: { connect: { id: id.user } }
			},
			select: { id: true }
		})

		const paymentData: CreatePaymentRequest = {
			amount: {
				value: amount.rub,
				currency: CurrencyEnum.RUB
			},
			capture: true,
			description: `Оплата заказа #${id.index} на сайте Honey Paradise`,
			metadata: {
				payment_id: payment.id
			},
			payment_method_data: {
				type: PaymentMethodsEnum.BANK_CARD
			},
			confirmation: {
				type: ConfirmationEnum.REDIRECT,
				locale: locale === "ru" ? LocaleEnum.ru_RU : LocaleEnum.en_US,
				return_url:
					// this.config.get<string>("CLIENT_URL") + EnumClientRoutes.PAID_ORDER // If Yookassa hook works
					this.config.get<string>("CLIENT_URL") +
					EnumClientRoutes.PAID_ORDER +
					`&id=${payment.id}`
			}
		}

		const transaction = await this.yookassaService.payments.create(paymentData)

		if (!transaction) throw new InternalServerErrorException("Payment failed!")

		if (isDev(this.config))
			await this.prisma.transaction.update({
				where: { id: payment.id },
				data: { externalId: transaction.id }
			})

		return (transaction.confirmation as ConfirmationRedirectResponse)
			.confirmation_url
	}

	async notification(dto: PaymentNotificationEvent): Promise<DefaultResponse> {
		const {
			object: { id: externalId, metadata, payment_method, captured_at },
			event
		} = dto

		if (event === NotificationEventEnum.PAYMENT_WAITING_FOR_CAPTURE) {
			await this.yookassaService.payments.capture(externalId)

			return success()
		}

		const payment = await this.prisma.transaction.update({
			where: { id: metadata.payment_id },
			data: {
				externalId,
				status:
					event === NotificationEventEnum.PAYMENT_SUCCEEDED
						? "SUCCEEDED"
						: "CANCELED",
				method: payment_method.type,
				capturedAt: captured_at,
				...(payment_method.type === PaymentMethodsEnum.BANK_CARD
					? {
							cardType: payment_method.card["card_type"],
							cardF6: payment_method.card["first6"],
							cardL4: payment_method.card["last4"]
						}
					: {})
			},
			select: { status: true, userId: true }
		})

		this.notificationSocket.handlePaymentUpdated(payment)

		return success()
	}

	// ! Only for development
	async capturePayment(id: string): Promise<DefaultResponse> {
		const payment = await this.prisma.transaction.findUnique({
			where: { id },
			select: { externalId: true }
		})

		if (!payment?.externalId)
			throw new NotFoundException("Payment wasn't found!") // TODO translate

		const transaction = await this.yookassaService.payments.getById(
			payment.externalId
		)

		if (!transaction)
			throw new NotFoundException("Yookassa transaction wasn't found!") // TODO translate

		await this.notification({
			event: NotificationEventEnum.PAYMENT_SUCCEEDED,
			object: transaction,
			type: NotificationTypeEnum.NOTIFICATION
		})

		return success()
	}
}
