import type { EnumCurrencies, EnumGenders, EnumThemes, EnumUserRoles } from "./enums.type";

import type { EnumLanguages } from "@/shared/lib/i18n";
import type { INotificationSettings } from "./notifications.type";

interface ISettingsUser {
	id: string;

	defaultLanguage?: EnumLanguages;
	defaultTheme?: EnumThemes;
	defaultCurrency: EnumCurrencies;

	useFullLogout: boolean;
	useTgTfaLogin: boolean;

	createdAt: Date;
	updatedAt: Date;
}

export interface IUserFull {
	id: string;
	role: EnumUserRoles;

	isVerified: boolean;
	isTFAEnabled: boolean;

	username: string;
	email: string;
	phoneNumber?: string;
	telegramId?: string;

	gender: EnumGenders;
	avatarPath: string;
	birthdate?: string;

	settings: ISettingsUser;
	notificationSettings: INotificationSettings;

	createdAt: Date;
	updatedAt: Date;
}
