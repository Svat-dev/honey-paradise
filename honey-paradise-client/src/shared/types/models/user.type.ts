import type { EnumGenders, EnumUserRoles } from "./enums.type";

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

	gender: EnumGenders;
	avatarPath?: string;
	birthdate?: string;

	createdAt: Date;
}
