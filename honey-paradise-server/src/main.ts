import "reflect-metadata";

import * as cookieParser from "cookie-parser";
import * as session from "express-session";

import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { NestFactory } from "@nestjs/core";
import { RedisStore } from "connect-redis";
import { CoreModule } from "./core/core.module";
import { RedisService } from "./core/redis/redis.service";
import { ms } from "./shared/lib/common/utils/ms.util";

async function bootstrap() {
	const app = await NestFactory.create(CoreModule, {});

	const config = app.get(ConfigService);
	const redis = app.get(RedisService);

	app.setGlobalPrefix("api");

	app.use(cookieParser(config.getOrThrow<string>("COOKIES_SECRET")));

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.use(
		session({
			secret: config.getOrThrow<string>("SESSION_SECRET"),
			name: config.getOrThrow<string>("SESSION_NAME"),
			resave: false,
			saveUninitialized: false,
			cookie: {
				domain: config.getOrThrow<string>("SESSION_DOMAIN"),
				maxAge: ms("30d"),
				httpOnly: true,
				secure: false,
				sameSite: "lax",
			},
			store: new RedisStore({
				client: redis,
				prefix: "sessions:",
			}),
		})
	);

	app.enableCors({
		origin: [config.getOrThrow<string>("CLIENT_URL"), "https://accounts.google.com"],
		credentials: true,
		exposedHeaders: ["set-cookie"],
	});

	await app.listen(config.getOrThrow<number>("SERVER_PORT"));
}

bootstrap();
