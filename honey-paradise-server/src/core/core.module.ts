import * as path from "path";

import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { IS_DEV_ENV } from "src/shared/lib/common/is-dev.util";
import { AuthModule } from "../modules/auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, "../..", "public"),
			serveRoot: "/static",
		}),
		PrismaModule,
		RedisModule,
		AuthModule,
	],
})
export class CoreModule {}
