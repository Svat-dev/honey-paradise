import { defaultInstance, instance } from "@/api/instance";
import type { ICreateAccountDto, ISignInDto } from "./types/auth-service.type";

import { EnumApiRoute } from "@constants/routes";

export const authService = {
	createAccount: async (dto: ICreateAccountDto, recaptcha?: string) => {
		const headers = recaptcha ? { recaptcha } : undefined;

		const data: ICreateAccountDto = {
			...dto,
			username: dto.username || undefined,
			birthdate: dto.birthdate || undefined,
		};

		const res = await defaultInstance.post<boolean>(EnumApiRoute.CREATE_ACCOUNT, data, { headers });

		return res.data;
	},

	signIn: async (dto: ISignInDto, recaptcha?: string) => {
		const headers = recaptcha ? { recaptcha } : undefined;

		const res = await defaultInstance.post(EnumApiRoute.SIGN_IN, dto, { headers });

		return res.data;
	},

	clearSession: async () => {
		const res = await defaultInstance.post(EnumApiRoute.CLEAR_SESSION, {});

		return res;
	},

	logout: async () => {
		const res = await instance.post(EnumApiRoute.LOGOUT, {});

		return res;
	},
};
