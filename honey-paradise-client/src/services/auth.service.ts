import { defaultInstance, instance } from "@/api/instance";
import type { IAuthTfaDto, ICreateAccountDto, ISignInDto, ISignInResponse } from "./types/auth-service.type";

import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const authService = {
	createAccount: async (dto: ICreateAccountDto, recaptcha?: string) => {
		const headers = recaptcha ? { recaptcha } : undefined;

		const data: ICreateAccountDto = {
			...dto,
			username: dto.username || undefined,
			birthdate: dto.birthdate || undefined,
		};

		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.CREATE_ACCOUNT, data, { headers });

		return res;
	},

	signIn: async (dto: ISignInDto, recaptcha?: string) => {
		const headers = recaptcha ? { recaptcha } : undefined;

		const res = await defaultInstance.post<any, AxiosResponse<ISignInResponse>>(EnumApiRoute.SIGN_IN, dto, { headers });

		return res.data;
	},

	telegramSignIn: async (dto: IAuthTfaDto) => {
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

	verifyTFACode: async (dto: IAuthTfaDto) => {
		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.VERIFY_TFA, dto);

		return res;
	},

	logout: async () => {
		const res = await instance.post<any, AxiosResponse<boolean>>(EnumApiRoute.LOGOUT);

		return res;
	},
};
