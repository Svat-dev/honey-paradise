import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha/google-recaptcha.module";
import { getRecaptchaConfig } from "src/core/config/recaptcha.config";
import { SessionsController } from "./sessions.controller";
import { SessionsService } from "./sessions.service";

@Module({
	imports: [
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getRecaptchaConfig,
			inject: [ConfigService],
		}),
	],
	controllers: [SessionsController],
	providers: [SessionsService],
})
export class SessionsModule {}
