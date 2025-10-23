import { defaultInstance, instance } from "@/api/instance";
import type { CreateProductDto, GetCatsWithProductsResponse, GetPresearchDataResponse } from "@/shared/types/server";

import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const productsService = {
	getAllCatsWithProducts: async (q?: string) => {
		const res = await defaultInstance.get<any, AxiosResponse<GetCatsWithProductsResponse>>(EnumApiRoute.GET_ALL_PRODUCTS, {
			params: { q: q || "" },
		});

		return res;
	},

	getPresearchData: async (searchTerm: string) => {
		const res = await defaultInstance.get<any, AxiosResponse<GetPresearchDataResponse>>(EnumApiRoute.GET_PRESEARCH_DATA, {
			params: { q: searchTerm },
		});

		return res;
	},

	createProduct: async (dto: CreateProductDto) => {
		const res = await instance.post<any, AxiosResponse<boolean>>(EnumApiRoute.CREATE_NEW_PRODUCT, dto);

		return res;
	},

	switchFavoritesProduct: async (productId: string) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(`${EnumApiRoute.SWITCH_FAVORITES_PRODUCTS}/${productId}`);

		return res;
	},
};
