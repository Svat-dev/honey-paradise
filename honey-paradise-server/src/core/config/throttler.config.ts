import { ConfigService } from "@nestjs/config/dist/config.service"
import type { ThrottlerModuleOptions } from "@nestjs/throttler/dist/throttler-module-options.interface"
import { I18nContext } from "nestjs-i18n/dist/i18n.context"
import { ms } from "src/shared/lib/common/utils"

export const getThrottlerConfig = (
	config: ConfigService
): ThrottlerModuleOptions => ({
	throttlers: [
		{
			name: "default",
			limit: config.getOrThrow<number>("DEFAULT_REQUESTS_LIMIT"),
			ttl: ms("15min")
		},
		{
			name: "auth",
			limit: config.getOrThrow<number>("AUTH_REQUESTS_LIMIT"),
			ttl: ms("10min")
		}
	],
	errorMessage: (ctx, details) => {
		const i18n = I18nContext.current(ctx)

		return i18n.t("d.errors.ddos.default")
	}
})
