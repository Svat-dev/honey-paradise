import { defaultInstance } from "@/api/instance";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";
import type { IUpdatePasswordDto } from "./types/profile-service.type";

export const profileService = {
	updatePassword: async (dto: IUpdatePasswordDto) => {
		const res = await defaultInstance.patch<any, AxiosResponse<boolean>>(`${EnumApiRoute.CHANGE_PASSWORD}`, dto);

		return res;
	},
};
