import type { EnumCurrencies, EnumLanguages, EnumThemes } from "@prisma/client"

export interface UserSettingsFile {
	uid: string

	defaultCurrency: EnumCurrencies | null
	defaultLanguage: EnumLanguages | null
	defaultTheme: EnumThemes | null

	useFullLogout: boolean
	isTFAEnabled: boolean
}
