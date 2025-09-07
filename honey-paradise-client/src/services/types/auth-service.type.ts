import type { EnumGenders } from "@/shared/types/models";

export interface ICreateAccountDto {
	email: string;
	password: string;
	username?: string;
	gender?: EnumGenders;
	birthdate?: string;
}

export interface ISignInDto {
	id: string;
	password: string;
}

export interface IAuthTfaDto {
	token: string;
}

export interface ISignInResponse {
	tfa: boolean;
	tg: boolean;
}
