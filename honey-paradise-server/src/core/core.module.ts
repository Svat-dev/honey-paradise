import * as path from "path";

import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { AccountModule } from "src/modules/auth/account/account.module";
import { ProfileModule } from "src/modules/auth/profile/profile.module";
import { SessionModule } from "src/modules/auth/session/session.module";
import { IS_DEV_ENV } from "src/shared/lib/common/utils/is-dev.util";
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

		// ...database modules
		PrismaModule,
		RedisModule,

		// ...other modules
		SessionModule,
		AccountModule,
		ProfileModule,
	],
})
export class CoreModule {}
