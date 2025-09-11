import { instance } from "@/api/instance";
import type { GetMyCartResponse } from "@/shared/types/server";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const cartService = {
	getMyCart: async () => {
		const res = await instance.get<any, AxiosResponse<GetMyCartResponse>>(EnumApiRoute.GET_MY_CART);

		return res;
	},
};
