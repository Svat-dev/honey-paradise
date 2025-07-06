import type { EnumGenders, EnumThemes } from "@/shared/types/models";

import type { EnumLanguages } from "@i18n/index";

export interface IUpdatePasswordDto {
	password: string;
	token: string;
}

export interface IUpdateProfileDto {
	phoneNumber?: string | null;
	username?: string;
	gender?: EnumGenders;
	birthdate?: Date | null;
}

export interface IUpdateUserSettingsDto {
	defaultLanguage?: EnumLanguages | null;
	defaultTheme?: EnumThemes | null;
}
