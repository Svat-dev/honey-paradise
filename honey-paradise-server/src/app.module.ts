import * as path from "path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, "..", "public"),
			serveRoot: "/static",
		}),
		AuthModule,
		// PrismaModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
