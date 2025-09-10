import { defaultInstance, instance } from "@/api/instance";
import type { AuthLoginDto, AuthTfaDto, CreateUserDto } from "@/shared/types/server";

import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";
import type { ISignInResponse } from "./types/auth-service.type";

export const authService = {
	createAccount: async (dto: CreateUserDto, recaptcha?: string) => {
		const headers = recaptcha ? { recaptcha } : undefined;

		const data: CreateUserDto = {
			...dto,
			username: dto.username || undefined,
			birthdate: dto.birthdate || undefined,
		};

		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.CREATE_ACCOUNT, data, { headers });

		return res;
	},

	signIn: async (dto: AuthLoginDto, recaptcha?: string) => {
		const headers = recaptcha ? { recaptcha } : undefined;

		const res = await defaultInstance.post<any, AxiosResponse<ISignInResponse>>(EnumApiRoute.SIGN_IN, dto, { headers });

		return res.data;
	},

	telegramSignIn: async (dto: AuthTfaDto) => {
		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.TG_TFA_LOGIN, dto);

		return res;
	},

	cancelTelegramSignIn: async () => {
		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.CANCEL_TG_TFA_LOGIN);

		return res;
	},

	sendTFACode: async () => {
		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.SEND_TFA_CODE);

		return res;
	},

	verifyTFACode: async (dto: AuthTfaDto) => {
		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.VERIFY_TFA, dto);

		return res;
	},

	logout: async () => {
		const res = await instance.post<any, AxiosResponse<boolean>>(EnumApiRoute.LOGOUT);

		return res;
	},
};
