import type { EnumLanguages } from "@/shared/lib/i18n";
import type { EnumThemes } from "./enums.type";

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

	useFullLogout: boolean;
	useTgTfaLogin: boolean;

	updatedAt: Date;
}
