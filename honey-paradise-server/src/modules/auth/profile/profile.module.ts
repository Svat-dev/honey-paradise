import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
	controllers: [ProfileController],
	providers: [ProfileService],
	exports: [ProfileService],
})
export class ProfileModule {}
