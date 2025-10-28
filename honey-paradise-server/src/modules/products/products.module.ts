import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileModule } from "../auth/profile/profile.module";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { CartModule } from "../cart/cart.module";
import { forwardRef } from "@nestjs/common";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [ProfileModule, ProfileModule],
  exports: [ProductsService],
})
export class ProductsModule {}
