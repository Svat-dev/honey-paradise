import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { DiscountsService } from "./services/discounts.service";
import { SpecialOffersService } from "./services/special-offers.service";
import { SpecialOffersController } from "./special-offers.controller";

@Module({
	controllers: [SpecialOffersController],
	providers: [SpecialOffersService, DiscountsService],
})
export class SpecialOffersModule {}
