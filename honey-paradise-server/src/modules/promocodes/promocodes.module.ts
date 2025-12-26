import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileModule } from "../auth/profile/profile.module";
import { PromoCodesController } from "./promocodes.controller";
import { PromoCodesService } from "./promocodes.service";

@Module({
	controllers: [PromoCodesController],
	providers: [PromoCodesService],
	imports: [ProfileModule],
	exports: [PromoCodesService],
})
export class PromoCodesModule {}
