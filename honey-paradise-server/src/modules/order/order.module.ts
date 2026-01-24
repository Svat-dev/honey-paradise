import { CartModule } from "../cart/cart.module";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProfileModule } from "../auth/profile/profile.module";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [ProfileModule, CartModule],
})
export class OrderModule {}
