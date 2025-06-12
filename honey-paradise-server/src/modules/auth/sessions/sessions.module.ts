import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha/google-recaptcha.module";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileModule } from "../profile/profile.module";
import { RedisModule } from "src/core/redis/redis.module";
import { SessionsController } from "./sessions.controller";
import { SessionsService } from "./sessions.service";
import { getRecaptchaConfig } from "src/core/config/recaptcha.config";

@Module({
	imports: [
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getRecaptchaConfig,
			inject: [ConfigService],
		}),
		ProfileModule,
		RedisModule,
	],
	controllers: [SessionsController],
	providers: [SessionsService],
})
export class SessionsModule {}
