import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { NestFactory } from "@nestjs/core"
import { IoAdapter } from "@nestjs/platform-socket.io/adapters/io-adapter"
import { SwaggerModule } from "@nestjs/swagger/dist/swagger-module"
import { RedisStore } from "connect-redis"
import * as cookieParser from "cookie-parser"
import * as session from "express-session"
import "reflect-metadata"

import { getSwaggerConfig } from "./core/config/swagger.config"
import { CoreModule } from "./core/core.module"
import { LoggerService } from "./core/logger/logger.service"
import { RedisService } from "./core/redis/redis.service"
import { ExceptionsFilter } from "./shared/filters/exceptions.filter"
import { EnumApiRoute } from "./shared/lib/common/constants"
import { ms } from "./shared/lib/common/utils/ms.util"

async function bootstrap() {
	const app = await NestFactory.create(CoreModule, {
		bufferLogs: true
	})

	const config = app.get(ConfigService)
	const redis = app.get(RedisService)

	app.setGlobalPrefix("api")

	app.use(cookieParser(config.getOrThrow<string>("COOKIES_SECRET")))

	app.useWebSocketAdapter(new IoAdapter(app))

	app.useLogger(new LoggerService())

	app.useGlobalPipes(new ValidationPipe({ transform: true }))
	app.useGlobalFilters(new ExceptionsFilter())

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
				sameSite: "lax"
			},
			store: new RedisStore({
				client: redis,
				prefix: config.getOrThrow<string>("SESSION_FOLDER")
			})
		})
	)

	app.enableCors({
		origin: [
			config.getOrThrow<string>("CLIENT_URL"),
			"https://accounts.google.com"
		],
		credentials: true
	})

	const swaggerConfig = getSwaggerConfig()
	const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
		autoTagControllers: true
	})

	SwaggerModule.setup(EnumApiRoute.DOCS, app, swaggerDoc, {
		jsonDocumentUrl: `${EnumApiRoute.DOCS}/openapi.json`,
		yamlDocumentUrl: `${EnumApiRoute.DOCS}/openapi.yaml`
	})

	await app.listen(config.getOrThrow<number>("SERVER_PORT"))
}

bootstrap()
