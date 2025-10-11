import type { AddCartItemDto, GetMyCartResponse } from "@/shared/types/server";

import { instance } from "@/api/instance";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const cartService = {
	getMyCart: async () => {
		const res = await instance.get<any, AxiosResponse<GetMyCartResponse>>(EnumApiRoute.GET_MY_CART);

		return res;
	},

	addToCart: async (dto: AddCartItemDto) => {
		const res = await instance.post<any, AxiosResponse<boolean>>(EnumApiRoute.ADD_CART_ITEM, dto);

		return res;
	},

	deleteFromCart: async (ciid: number) => {
		const res = await instance.delete<any, AxiosResponse<boolean>>(EnumApiRoute.DELETE_CART_ITEM + `/${ciid}`);

		return res;
	},

	clearAllCart: async () => {
		const res = await instance.delete<any, AxiosResponse<boolean>>(EnumApiRoute.CLEAR_CART);

		return res;
	},
};
