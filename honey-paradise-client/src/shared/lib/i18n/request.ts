import { getRequestConfig } from "next-intl/server"

import { getCurrentLanguage } from "./"

export default getRequestConfig(async () => {
	const locale = await getCurrentLanguage()

	return {
		locale,
		messages: (await import(`../../../../public/languages/${locale}.json`))
			.default
	}
})
