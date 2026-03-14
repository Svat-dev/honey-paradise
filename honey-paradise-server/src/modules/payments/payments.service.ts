import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { EnumTransactionStatus } from "@prisma/client"
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
	): Promise<GetAllPaymentsResponse[]> {
		try {
			const { type, field, status, page, q } = {
				...defaultPaymentsQuery,
				...query
			}

			const enumStatuses = Object.values(EnumTransactionStatus)
			const statuses = status.split(",").map(i => enumStatuses[i] ?? undefined)

			const payments = await this.prisma.transaction.findMany({
				where: { userId, status: { in: statuses } },
				select: {
					id: true,
					externalId: true,
					amount: true,
					status: true,
					createdAt: true
				},
				orderBy: { [field]: type },
				skip: (page - 1) * 30,
				take: 30
			})

			const result = []
			for (const { externalId, ...item } of payments) {
				const extra = await this.getMorePaymentInfo(externalId)

				if (
					!extra.description.toLowerCase().includes(q) &&
					!extra.method.card?.number?.includes(q)
				)
					continue

				result.push({
					...item,
					...extra
				})
			}

			return result
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException(
				"Error while getting all payments!"
			)
		}
	}

	async getMorePaymentInfo(
		externalId: string
	): Promise<
		Pick<GetAllPaymentsResponse, "capturedAt" | "description" | "method">
	> {
		const extraData = await this.yookassaService.payments.getById(externalId)
		const card = extraData.payment_method["card"]

		return {
			capturedAt: extraData.captured_at,
			description: extraData.description,
			method: {
				type: extraData.payment_method.type,
				card:
					extraData.payment_method.type === PaymentMethodsEnum.BANK_CARD
						? {
								type: extraData.payment_method.card["card_type"],
								number: `${card["first6"]}******${card["last4"]}`
							}
						: null
			}
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
					this.config.get<string>("CLIENT_URL") + EnumClientRoutes.PAID_ORDER
			}
		}

		const transaction = await this.yookassaService.payments.create(paymentData)

		if (!transaction) throw new InternalServerErrorException("Payment failed!")

		if (isDev(this.config))
			await this.notification({
				event: NotificationEventEnum.PAYMENT_SUCCEEDED,
				object: transaction,
				type: NotificationTypeEnum.NOTIFICATION
			})

		return (transaction.confirmation as ConfirmationRedirectResponse)
			.confirmation_url
	}

	async notification(dto: PaymentNotificationEvent): Promise<DefaultResponse> {
		const {
			object: { id: externalId, metadata },
			event
		} = dto

		if (event === NotificationEventEnum.PAYMENT_WAITING_FOR_CAPTURE) {
			await this.yookassaService.payments.capture(externalId)

			return success()
		} else if (event === NotificationEventEnum.PAYMENT_SUCCEEDED) {
			const payment = await this.prisma.transaction.update({
				where: { id: metadata.payment_id },
				data: { externalId, status: "SUCCEEDED" },
				select: { status: true, userId: true }
			})

			this.notificationSocket.handlePaymentUpdated(payment)

			return success()
		} else {
			const payment = await this.prisma.transaction.update({
				where: { id: metadata.payment_id },
				data: { externalId, status: "CANCELED" },
				select: { status: true, userId: true }
			})

			this.notificationSocket.handlePaymentUpdated(payment)

			return success()
		}
	}
}
