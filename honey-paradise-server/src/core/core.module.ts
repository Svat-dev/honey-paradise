import * as path from "path";

import { CookieResolver, I18nModule } from "nestjs-i18n";

import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { AccountModule } from "src/modules/auth/account/account.module";
import { ProfileModule } from "src/modules/auth/profile/profile.module";
import { SessionsModule } from "src/modules/auth/sessions/sessions.module";
import { IS_DEV_ENV } from "src/shared/lib/common/utils/is-dev.util";
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
			serveRoot: "/static",
		}),
		I18nModule.forRoot({
			fallbackLanguage: "en",
			loaderOptions: { path: path.join(__dirname, "../..", "public/i18n"), watch: true },
			resolvers: [new CookieResolver(["HONEY_PARADISE_LOCALE_LANGUAGE"])],
		}),
		MailModule,

		// ...database modules
		PrismaModule,
		RedisModule,

		// ...other modules
		AccountModule,
		ProfileModule,
		SessionsModule,
	],
})
export class CoreModule {}
