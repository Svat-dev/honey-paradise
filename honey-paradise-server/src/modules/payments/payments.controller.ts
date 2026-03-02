import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator"
import { Body } from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { type PaymentNotificationEvent, YookassaWebhook } from "nestjs-yookassa"

import { PaymentsService } from "./payments.service"

@Controller("payments")
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@HttpCode(HttpStatus.OK)
	@YookassaWebhook()
	@Post("notification")
	paymentNotification(@Body() dto: PaymentNotificationEvent) {
		return this.paymentsService.notification(dto)
	}
}
