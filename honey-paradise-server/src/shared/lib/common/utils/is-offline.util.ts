import { ConfigService } from "@nestjs/config/dist/config.service"
import * as dotenv from "dotenv"

dotenv.config()

export const isOffline = (confService: ConfigService) =>
	confService.get("CONNECTION") === "offline"

export const IS_OFFLINE_ENV = process.env.CONNECTION === "offline"
