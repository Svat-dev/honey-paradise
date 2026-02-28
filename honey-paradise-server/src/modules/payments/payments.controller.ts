import { Controller } from "@nestjs/common/decorators/core/controller.decorator"

import { PaymentsService } from "./payments.service"

@Controller("payments")
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}
}
