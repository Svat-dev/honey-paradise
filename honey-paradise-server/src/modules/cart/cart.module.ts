import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProductsModule } from "../products/products.module";
import { ProfileModule } from "../auth/profile/profile.module";
import { forwardRef } from "@nestjs/common";

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [ProfileModule, ProductsModule],
  exports: [CartService],
})
export class CartModule {}
