import type { EnumGenders, EnumUserRoles } from "./enums.type";

import type { INotificationSettings } from "./notifications.type";
import type { ISettings } from "./settings.type";

export interface IUser {
	id: string;
	role: EnumUserRoles;

	email: string;
	password: string;

	isVerified: boolean;
	isTFAEnabled: boolean;

	telegramId: string | null;
	phoneNumber: string | null;
	username: string;

	gender: EnumGenders;
	avatarPath?: string;
	birthdate?: Date;

	createdAt: Date;
	updatedAt: Date;
}

export interface IUserFull {
	id: string;
	role: EnumUserRoles;

	username: string;
	email: string;
	phoneNumber?: string;
	telegramId?: string;

	gender: EnumGenders;
	avatarPath: string;
	birthdate?: string;

	settings: ISettings;
	notificationSettings: INotificationSettings;

	createdAt: Date;
}
