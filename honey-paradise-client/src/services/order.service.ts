import type { CreateOrderResponse, GetAllOrdersResponse } from "@/shared/types/server";

import { instance } from "@/api/instance";
import { EnumApiRoute } from "@/shared/lib/constants/routes";
import type { AxiosResponse } from "axios";

export const orderService = {
	getAll: async () => {
		const res = await instance.get<any, AxiosResponse<GetAllOrdersResponse[]>>(EnumApiRoute.GET_USER_ORDERS);

		return res;
	},

	create: async () => {
		const res = await instance.post<any, AxiosResponse<CreateOrderResponse>>(EnumApiRoute.CREATE_ORDER, {});

		return res;
	},
};
