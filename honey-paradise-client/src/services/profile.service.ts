import type { IUpdateProfileDto, IUpdateUserSettingsDto } from "./types/profile-service.type";

import { getContentType } from "@/api/api-helper";
import { instance } from "@/api/instance";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const profileService = {
	uniqueFieldCheck: async (fieldValue: string | undefined, field: "email" | "username" | "phone") => {
		const res = await instance.post<any, AxiosResponse<boolean>>(`${EnumApiRoute.CHECK_UNIQUE}/${field}`, { fieldValue });

		return res;
	},

	updateProfile: async (dto: IUpdateProfileDto) => {
		const res = await instance.put<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_PROFILE, dto);

		return res;
	},

	updateSettings: async (dto: IUpdateUserSettingsDto) => {
		const res = await instance.put<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_PROFILE_SETTINGS, dto);

		return res;
	},

	updateAvatar: async (dto: FormData) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_AVATAR, dto, {
			headers: getContentType("form-data"),
		});

		return res;
	},

	deleteAvatar: async () => {
		const res = await instance.delete<any, AxiosResponse<boolean>>(EnumApiRoute.DELETE_AVATAR);

		return res;
	},
};
