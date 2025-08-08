import { defaultInstance, instance } from "@/api/instance";
import type { IEmailVerifyDto, IPasswordRecoverDto, IRecoverPasswordDto, IUpdatePasswordDto } from "./types/account-service.type";

import type { IUserFull } from "@/shared/types/models";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const accountService = {
	getMyAccount: async () => {
		const res = await instance.get<any, AxiosResponse<IUserFull>>(EnumApiRoute.MY_ACCOUNT);

		return res;
	},

	updateEmail: async (dto: IPasswordRecoverDto) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_EMAIL, dto);

		return res;
	},

	updatePassword: async (dto: IUpdatePasswordDto) => {
		const res = await instance.patch<any, AxiosResponse<boolean | { res: string }>>(EnumApiRoute.UPDATE_PASSWORD, dto);

		return res;
	},

	recoverPassword: async (dto: IRecoverPasswordDto) => {
		const res = await defaultInstance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.RECOVER_PASSWORD, dto);

		return res;
	},

	sendVerificationCode: async () => {
		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.SEND_EMAIL_VERIFICATION_CODE, {});

		return res;
	},

	sendPasswordRecoverCode: async (dto: IPasswordRecoverDto) => {
		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.RESET_PASSWORD, dto);

		return res;
	},

	verifyEmail: async (dto: IEmailVerifyDto) => {
		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.VERIFY_EMAIL, dto);

		return res;
	},
};
