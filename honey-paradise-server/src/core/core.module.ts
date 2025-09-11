import * as path from "path";

import { CookieResolver, I18nModule } from "nestjs-i18n";

import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { APP_GUARD } from "@nestjs/core/constants";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { ThrottlerGuard } from "@nestjs/throttler/dist/throttler.guard";
import { ThrottlerModule } from "@nestjs/throttler/dist/throttler.module";
import { AccountModule } from "src/modules/auth/account/account.module";
import { ProfileModule } from "src/modules/auth/profile/profile.module";
import { ProvidersModule } from "src/modules/auth/providers/providers.module";
import { SessionsModule } from "src/modules/auth/sessions/sessions.module";
import { VerificationModule } from "src/modules/auth/verification/verification.module";
import { CartModule } from "src/modules/cart/cart.module";
import { CronModule } from "src/modules/cron/cron.module";
import { NotificationsModule } from "src/modules/notifications/notifications.module";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { IS_DEV_ENV } from "src/shared/lib/common/utils/is-dev.util";
import { EnumStorageKeys } from "src/shared/types/client/enums.type";
import { getI18nConfig } from "./config/i18n.config";
import { getJwtConfig } from "./config/jwt.config";
import { getThrottlerConfig } from "./config/throttler.config";
import { MailModule } from "./mail/mail.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";
import { TelegramModule } from "./telegram/telegram.module";

@Module({
	imports: [
		// ...config modules
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, "../..", "public"),
			serveRoot: EnumApiRoute.STATIC,
		}),
		I18nModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getI18nConfig,
			resolvers: [new CookieResolver([EnumStorageKeys.LOCALE_LANGUAGE])],
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
			global: true,
		}),
		MailModule,

		// DDoS protection
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getThrottlerConfig,
		}),

		// ...database modules
		PrismaModule,
		RedisModule,

		// websockets modules

		// ...other modules
		CronModule,
		TelegramModule,
		AccountModule,
		ProfileModule,
		SessionsModule,
		ProvidersModule,
		VerificationModule,
		NotificationsModule,
		CartModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class CoreModule {}
