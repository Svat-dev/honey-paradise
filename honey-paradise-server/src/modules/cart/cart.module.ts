import { Module } from "@nestjs/common/decorators/modules/module.decorator"

import { ProfileModule } from "../auth/profile/profile.module"
import { ProductsModule } from "../products/products.module"
import { PromoCodesModule } from "../promocodes/promocodes.module"

import { CartController } from "./cart.controller"
import { CartService } from "./cart.service"

@Module({
	controllers: [CartController],
	providers: [CartService],
	imports: [ProfileModule, ProductsModule, PromoCodesModule],
	exports: [CartService]
})
export class CartModule {}
