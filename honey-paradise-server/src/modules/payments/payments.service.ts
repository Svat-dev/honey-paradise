import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { ConfigService } from "@nestjs/config/dist/config.service"
import type {
	CreatePaymentRequest,
	PaymentNotificationEvent
} from "nestjs-yookassa"
import {
	ConfirmationEnum,
	CurrencyEnum,
	LocaleEnum,
	NotificationEventEnum,
	PaymentMethodsEnum
} from "nestjs-yookassa"
import { YookassaService } from "nestjs-yookassa/dist/yookassa.service"
import * as path from "path"
import { PrismaService } from "src/core/prisma/prisma.service"
import { success } from "src/shared/lib/common/utils"
import type { DefaultResponse } from "src/shared/lib/response/default.res"
import { EnumClientRoutes } from "src/shared/types/client/enums.type"

@Injectable()
export class PaymentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly config: ConfigService,
		private readonly yookassaService: YookassaService
	) {}

	async createPayment(
		userId: string,
		orderId: string,
		amount: number,
		locale: string
	) {
		const payment = await this.prisma.transaction.create({
			data: {
				amount,
				order: { connect: { id: orderId } },
				user: { connect: { id: userId } }
			},
			select: { id: true }
		})

		const paymentData: CreatePaymentRequest = {
			amount: {
				value: amount,
				currency: CurrencyEnum.USD
			},
			capture: true,
			description: "Оплата заказа на сайте Honey Paradise",
			metadata: {
				payment_id: payment.id
			},
			payment_method_data: {
				type: PaymentMethodsEnum.BANK_CARD
			},
			confirmation: {
				type: ConfirmationEnum.REDIRECT,
				locale: locale === "ru" ? LocaleEnum.ru_RU : LocaleEnum.en_US,
				return_url: path.join(
					this.config.get<string>("CLIENT_URL"),
					EnumClientRoutes.PAID_ORDER
				)
			}
		}

		const transaction = await this.yookassaService.payments.create(paymentData)

		if (!transaction) throw new InternalServerErrorException("Payment failed!")

		return transaction
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
			await this.prisma.transaction.update({
				where: { id: metadata.payment_id },
				data: { externalId, status: "SUCCEEDED" }
			})

			return success()
		} else {
			await this.prisma.transaction.update({
				where: { id: metadata.payment_id },
				data: { externalId, status: "CANCELED" }
			})

			return success()
		}
	}
}
