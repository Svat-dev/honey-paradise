import { ConfigService } from "@nestjs/config/dist/config.service"
import * as dotenv from "dotenv"

dotenv.config()

export const isDev = (confService: ConfigService) =>
	confService.get("NODE_ENV") === "development"

export const IS_DEV_ENV = process.env.NODE_ENV === "development"
