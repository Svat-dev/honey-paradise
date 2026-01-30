import { EnumApiRoute } from "@constants/routes"
import type { AxiosResponse } from "axios"

import { defaultInstance, instance } from "@/api/instance"
import type {
	CreateProductDto,
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
		>(EnumApiRoute.GET_PRESEARCH_DATA, {
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
		>(`${EnumApiRoute.GET_PRODUCT_BY_SLUG}/${slug}`)

		return res.data
	},

	getRating: async (slug: string) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetProductsRatingResponse>
		>(`${EnumApiRoute.GET_PRODUCT_RATING}/${slug}`)

		return res
	},

	getByIds: async (ids: string[]) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetProductResponse[]>
		>(EnumApiRoute.GET_PRODUCTS_BY_IDS, {
			params: { ids: ids.join(",") }
		})

		return res.data
	},

	getByCatSlug: async (slug: string) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetAllCatsResponse>
		>(`${EnumApiRoute.PRODUCTS_CATEGORY}/${slug}`)

		return res
	},

	getFavorites: async () => {
		const res = await instance.get<
			any,
			AxiosResponse<GetFavoriteProductsResponse>
		>(EnumApiRoute.FAVORITES_PRODUCTS)

		return res
	},

	createProduct: async (dto: CreateProductDto) => {
		const res = await instance.post<any, AxiosResponse<boolean>>(
			EnumApiRoute.CREATE_NEW_PRODUCT,
			dto
		)

		return res
	},

	addFavoritesToCart: async () => {
		const res = await instance.post<any, AxiosResponse<boolean>>(
			EnumApiRoute.ADD_FAVORITES_TO_CART
		)

		return res
	},

	switchFavoritesProduct: async (productId: string) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(
			`${EnumApiRoute.SWITCH_FAVORITES_PRODUCTS}/${productId}`
		)

		return res
	},

	clearAllFavoritesProducts: async () => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(
			EnumApiRoute.CLEAR_FAVORITES_PRODUCTS
		)

		return res
	}
}
