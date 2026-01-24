import type { I18nOptionsWithoutResolvers } from "nestjs-i18n/dist/interfaces/i18n-options.interface"
import * as path from "path"

export const getI18nConfig = (): I18nOptionsWithoutResolvers => ({
	fallbackLanguage: "en",
	loaderOptions: {
		path: path.join(__dirname, "../../..", "public/i18n"),
		watch: true
	}
})
