import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha/google-recaptcha.module";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { NotificationsModule } from "src/modules/notifications/notifications.module";
import { ProfileModule } from "../profile/profile.module";
import { SessionsModule } from "../sessions/sessions.module";
import { VerificationModule } from "../verification/verification.module";
import { getRecaptchaConfig } from "src/core/config/recaptcha.config";

@Module({
	imports: [
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getRecaptchaConfig,
			inject: [ConfigService],
		}),
		ProfileModule,
		VerificationModule,
		SessionsModule,
		NotificationsModule,
	],
	controllers: [AccountController],
	providers: [AccountService],
})
export class AccountModule {}
