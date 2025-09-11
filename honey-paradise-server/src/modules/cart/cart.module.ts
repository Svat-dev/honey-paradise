import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileModule } from "../auth/profile/profile.module";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

@Module({
	controllers: [CartController],
	providers: [CartService],
	imports: [ProfileModule],
})
export class CartModule {}
