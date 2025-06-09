import { EnumGenders } from "./enums.type";

export interface IUser {
	id: string;
	email: string;
	password: string;

	isVerified: boolean;
	isTFAEnabled: boolean;

	username: string;
	avatarPath?: string;
	gender?: EnumGenders;
	birthdate?: Date;

	createdAt: Date;
	updatedAt: Date;
}
