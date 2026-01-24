import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileModule } from "../auth/profile/profile.module";
import { DiscountsController } from "./controllers/discounts.controller";
import { SpecialOffersController } from "./controllers/special-offers.controller";
import { DiscountsService } from "./services/discounts.service";
import { SpecialOffersService } from "./services/special-offers.service";

@Module({
  controllers: [SpecialOffersController, DiscountsController],
  providers: [SpecialOffersService, DiscountsService],
  imports: [ProfileModule],
})
export class OffersModule {}
