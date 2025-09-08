import type { EnumCurrencies, EnumThemes } from "./enums.type";

import type { EnumLanguages } from "@/shared/lib/i18n";

export interface ISettings {
	id: string;

	defaultLanguage?: EnumLanguages;
	defaultTheme?: EnumThemes;

	useFullLogout: boolean;
	useTgTfaLogin: boolean;

	createdAt: Date;
	updatedAt: Date;
}

export interface ISettingsUser {
	id: string;

	defaultLanguage?: EnumLanguages;
	defaultTheme?: EnumThemes;
	defaultCurrency: EnumCurrencies;

	useFullLogout: boolean;
	useTgTfaLogin: boolean;

	updatedAt: Date;
}
