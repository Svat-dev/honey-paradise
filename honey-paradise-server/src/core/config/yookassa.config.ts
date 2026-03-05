import { ConfigService } from "@nestjs/config/dist/config.service"
import type { YookassaModuleOptions } from "nestjs-yookassa/dist/common/interfaces"

export const getYookassaConfig = (
	config: ConfigService
): YookassaModuleOptions => ({
	shopId: config.getOrThrow<string>("YOOKASSA_SHOP_ID"),
	apiKey: config.getOrThrow<string>("YOOKASSA_SECRET_KEY")
})
