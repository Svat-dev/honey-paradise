import { Module } from "@nestjs/common/decorators/modules/module.decorator"

import { PaymentsController } from "./payments.controller"
import { PaymentsService } from "./payments.service"

@Module({
	controllers: [PaymentsController],
	providers: [PaymentsService]
})
export class PaymentsModule {}
