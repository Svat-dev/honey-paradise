import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha/google-recaptcha.module";
import { getRecaptchaConfig } from "src/core/config/recaptcha.config";
import { ProfileModule } from "../profile/profile.module";
import { VerificationModule } from "../verification/verification.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

@Module({
	imports: [
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getRecaptchaConfig,
			inject: [ConfigService],
		}),
		ProfileModule,
		VerificationModule,
	],
	controllers: [AccountController],
	providers: [AccountService],
})
export class AccountModule {}
