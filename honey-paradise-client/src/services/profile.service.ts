import { defaultInstance, instance } from "@/api/instance";

import type { AxiosResponse } from "axios";
import { EnumApiRoute } from "@constants/routes";
import type { IUpdatePasswordDto } from "./types/profile-service.type";

export const profileService = {
	updatePassword: async (dto: IUpdatePasswordDto) => {
		const res = await defaultInstance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.CHANGE_PASSWORD, dto);

		return res;
	},

	updateAvatar: async (dto: FormData) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_AVATAR, dto);

		return res;
	},

	deleteAvatar: async () => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.DELETE_AVATAR);

		return res;
	},
};
