import { UpdateAvatarFrameDto, UpdateUserDto, UpdateUserSettingsDto, UploadSettingsResponse } from "@/shared/types/server";

import { getContentType } from "@/api/api-helper";
import { instance } from "@/api/instance";
import type { Nullable } from "@/shared/types";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const profileService = {
	downloadSettings: async (format: "yml" | "json") => {
		const res = await instance.get(EnumApiRoute.DOWNLOAD_PROFILE_SETTINGS, {
			responseType: "blob",
			params: { format },
		});

		return res;
	},

	uploadSettings: async (dto: FormData) => {
		const res = await instance.post<any, AxiosResponse<UploadSettingsResponse>>(EnumApiRoute.UPLOAD_PROFILE_SETTINGS, dto, {
			headers: getContentType("form-data"),
		});

		return res;
	},

	uniqueFieldCheck: async (fieldValue: string | undefined, field: "email" | "username" | "phone") => {
		const res = await instance.post<any, AxiosResponse<boolean>>(`${EnumApiRoute.CHECK_UNIQUE}/${field}`, { fieldValue });

		return res;
	},

	updateProfile: async (dto: Nullable<UpdateUserDto>) => {
		const res = await instance.put<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_PROFILE, dto);

		return res;
	},

	updateSettings: async (dto: Nullable<UpdateUserSettingsDto>) => {
		const res = await instance.put<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_PROFILE_SETTINGS, dto);

		return res;
	},

	updateAvatar: async (dto: FormData) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_AVATAR, dto, {
			headers: getContentType("form-data"),
		});

		return res;
	},

	updateAvatarFrame: async (dto: UpdateAvatarFrameDto) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_AVATAR_FRAME, dto);

		return res;
	},

	deleteAvatar: async () => {
		const res = await instance.delete<any, AxiosResponse<boolean>>(EnumApiRoute.DELETE_AVATAR);

		return res;
	},
};
