import "reflect-metadata";

import * as cookieParser from "cookie-parser";

import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);

	app.setGlobalPrefix("api");

	app.use(cookieParser(config.getOrThrow<string>("COOKIES_SECRET")));

	app.useGlobalPipes(new ValidationPipe());

	app.enableCors({
		origin: [config.getOrThrow<string>("CLIENT_URL"), "https://accounts.google.com"],
		credentials: true,
		exposedHeaders: ["set-cookie"],
	});

	await app.listen(config.getOrThrow<number>("SERVER_PORT"));
}

bootstrap();
