import { instance } from "@/api/instance";
import { EnumApiRoute } from "@/shared/lib/constants/routes";
import type { IUserFull } from "@/shared/types/models";
import type { AxiosResponse } from "axios";

export const accountService = {
	getMyAccount: async () => {
		const res = await instance.get<any, AxiosResponse<IUserFull>>(EnumApiRoute.MY_ACCOUNT);

		return res;
	},
};
