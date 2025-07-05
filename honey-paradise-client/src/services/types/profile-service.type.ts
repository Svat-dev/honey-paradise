import type { EnumGenders } from "@/shared/types/models";

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
