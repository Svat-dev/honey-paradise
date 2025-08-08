import * as path from "path";

import { CookieResolver, I18nModule } from "nestjs-i18n";

import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { AccountModule } from "src/modules/auth/account/account.module";
import { ProfileModule } from "src/modules/auth/profile/profile.module";
import { SessionsModule } from "src/modules/auth/sessions/sessions.module";
import { VerificationModule } from "src/modules/auth/verification/verification.module";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { IS_DEV_ENV } from "src/shared/lib/common/utils/is-dev.util";
import { EnumStorageKeys } from "src/shared/types/client/enums.type";
import { getI18nConfig } from "./config/i18n.config";
import { MailModule } from "./mail/mail.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";

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
		MailModule,

		// ...database modules
		PrismaModule,
		RedisModule,

		// ...other modules
		AccountModule,
		ProfileModule,
		SessionsModule,
		VerificationModule,
	],
})
export class CoreModule {}
