import { defaultInstance, instance } from "@/api/instance";
import type { IUpdatePasswordDto, IUpdateProfileDto, IUpdateUserSettingsDto } from "./types/profile-service.type";

import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const profileService = {
	updatePassword: async (dto: IUpdatePasswordDto) => {
		const res = await defaultInstance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.CHANGE_PASSWORD, dto);

		return res;
	},

	updateProfile: async (dto: IUpdateProfileDto) => {
		const res = await instance.put<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_PROFILE, dto);

		return res;
	},

	updateSettings: async (dto: IUpdateUserSettingsDto) => {
		const res = await instance.put<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_SETTINGS, dto);

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
