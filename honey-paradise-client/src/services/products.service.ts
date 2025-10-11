import { defaultInstance, instance } from "@/api/instance";
import type { CreateProductDto, GetCatsWithProductsResponse } from "@/shared/types/server";

import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const productsService = {
	getAllCatsWithProducts: async () => {
		const res = await defaultInstance.get<any, AxiosResponse<GetCatsWithProductsResponse[]>>(EnumApiRoute.GET_ALL_PRODUCTS);

		return res;
	},

	createProduct: async (dto: CreateProductDto) => {
		const res = await instance.post<any, AxiosResponse<boolean>>(EnumApiRoute.CREATE_NEW_PRODUCT, dto);

		return res;
	},
};
