import { Module } from "@nestjs/common/decorators/modules/module.decorator"

import { ProfileModule } from "../auth/profile/profile.module"

import { TranslationsController } from "./translations.controller"
import { TranslationsService } from "./translations.service"

@Module({
	controllers: [TranslationsController],
	providers: [TranslationsService],
	imports: [ProfileModule]
})
export class TranslationsModule {}
