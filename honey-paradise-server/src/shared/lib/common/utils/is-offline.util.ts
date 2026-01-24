import * as dotenv from "dotenv";

import { ConfigService } from "@nestjs/config/dist/config.service";

dotenv.config();

export const isOffline = (confService: ConfigService) =>
  confService.get("CONNECTION") === "offline";

export const IS_OFFLINE_ENV = process.env.CONNECTION === "offline";
