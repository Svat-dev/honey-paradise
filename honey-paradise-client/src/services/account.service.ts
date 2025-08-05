import { defaultInstance, instance } from "@/api/instance";
import type { IEmailVerificationDto, IEmailVerifyDto, IPasswordRecoverDto } from "./types/account-service.type";

import { EnumApiRoute } from "@/shared/lib/constants/routes";
import type { IUserFull } from "@/shared/types/models";
import type { AxiosResponse } from "axios";

export const accountService = {
	getMyAccount: async () => {
		const res = await instance.get<any, AxiosResponse<IUserFull>>(EnumApiRoute.MY_ACCOUNT);

		return res;
	},

	updateEmail: async (dto: IEmailVerificationDto) => {
		const res = await instance.post<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_EMAIL, dto);

		return res;
	},

	sendVerificationCode: async (dto: IEmailVerificationDto) => {
		const res = await defaultInstance.post<any, AxiosResponse<boolean>>(EnumApiRoute.SEND_EMAIL_VERIFICATION_CODE, dto);

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
