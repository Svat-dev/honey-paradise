import { EnumApiRoute } from "@constants/routes"
import type { AxiosResponse } from "axios"

import { defaultInstance, instance } from "@/api/instance"
import type {
	CreateProductDto,
	DefaultResponse,
	GetAllCatsResponse,
	GetCatsWithProductsResponse,
	GetFavoriteProductsResponse,
	GetPresearchDataResponse,
	GetProductBySlugResponse,
	GetProductResponse,
	GetProductsRatingResponse
} from "@/shared/types/server"

export const productsService = {
	getAllCatsWithProducts: async (q?: string) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetCatsWithProductsResponse>
		>(EnumApiRoute.GET_ALL_PRODUCTS, {
			params: { q: q || "" }
		})

		return res
	},

	getPresearchData: async (searchTerm: string) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetPresearchDataResponse>
		>(EnumApiRoute.GET_PRESEARCH_INFO, {
			params: { q: searchTerm }
		})

		return res
	},

	getPopular: async () => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetProductResponse[]>
		>(EnumApiRoute.GET_POPULAR_PRODUCTS)

		return res.data
	},

	getBySlug: async (slug: string) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetProductBySlugResponse>
		>(EnumApiRoute.GET_PRODUCT_BY_SLUG(slug))

		return res.data
	},

	getRating: async (slug: string) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetProductsRatingResponse>
		>(EnumApiRoute.GET_PRODUCT_RATING_BY_SLUG(slug))

		return res
	},

	getByIds: async (ids: string[]) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetProductResponse[]>
		>(EnumApiRoute.GET_PRODUCTS_BY_ID, {
			params: { ids: ids.join(",") }
		})

		return res.data
	},

	getByCatSlug: async (slug: string) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetAllCatsResponse>
		>(EnumApiRoute.GET_CATEGORY_BY_SLUG(slug))

		return res
	},

	getFavorites: async () => {
		const res = await instance.get<
			any,
			AxiosResponse<GetFavoriteProductsResponse>
		>(EnumApiRoute.GET_ALL_FAVORITES)

		return res
	},

	createProduct: async (dto: CreateProductDto) => {
		const res = await instance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.CREATE_PRODUCT,
			dto
		)

		return res
	},

	addFavoritesToCart: async () => {
		const res = await instance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.CART_TO_FAVORITES
		)

		return res
	},

	switchFavoritesProduct: async (variantId: string) => {
		const res = await instance.patch<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.SWITCH_FAVORITE(variantId)
		)

		return res
	},

	clearAllFavoritesProducts: async () => {
		const res = await instance.patch<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.CLEAR_FAVORITES
		)

		return res
	}
}
