import { Module } from "@nestjs/common/decorators/modules/module.decorator"

import { ProfileModule } from "../auth/profile/profile.module"
import { CartModule } from "../cart/cart.module"

import { OrderController } from "./order.controller"
import { OrderService } from "./order.service"

@Module({
	controllers: [OrderController],
	providers: [OrderService],
	imports: [ProfileModule, CartModule]
})
export class OrderModule {}
