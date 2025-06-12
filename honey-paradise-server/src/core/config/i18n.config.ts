import * as path from "path";

import { I18nOptionsWithoutResolvers } from "nestjs-i18n/dist/interfaces/i18n-options.interface";

export const getI18nConfig = (): I18nOptionsWithoutResolvers => ({
	fallbackLanguage: "en",
	loaderOptions: {
		path: path.join(__dirname, "/src/i18n/"),
		watch: true,
	},
});
