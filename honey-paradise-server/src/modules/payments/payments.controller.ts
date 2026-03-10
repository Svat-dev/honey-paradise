import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import {
	Get,
	Post
} from "@nestjs/common/decorators/http/request-mapping.decorator"
import {
	Body,
	Query
} from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger"
import { SkipThrottle } from "@nestjs/throttler/dist/throttler.decorator"
import { type PaymentNotificationEvent, YookassaWebhook } from "nestjs-yookassa"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { Authorized } from "src/shared/decorators/authorized.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"

import {
	defaultPaymentsQuery,
	GetAllPaymentsQueryDto
} from "./dto/get-all-payments.dto"
import { PaymentsService } from "./payments.service"
import { GetAllPaymentsResponse } from "./response/get-all-payments.res"

@ApiTags("Payments (Transactions)")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.PAYMENTS)
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@ApiOperation({ summary: "Get all payments by user" })
	@ApiResponse({ type: GetAllPaymentsResponse, isArray: true })
	@ApiQuery({ type: GetAllPaymentsQueryDto })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.GET_USER_PAYMENTS)
	getAllByUser(
		@Authorized("id") userId: string,
		@Query() query: GetAllPaymentsQueryDto = defaultPaymentsQuery
	) {
		return this.paymentsService.getPaymentsByUser(userId, query)
	}

	@HttpCode(HttpStatus.OK)
	@YookassaWebhook()
	@Post(EnumApiRoute.YOOKASSA_WEBHOOK)
	paymentNotification(@Body() dto: PaymentNotificationEvent) {
		return this.paymentsService.notification(dto)
	}
}
