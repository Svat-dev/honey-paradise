import { EnumApiRoute } from "@constants/routes"
import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import type {
	AddCartItemDto,
	GetMyCartResponse,
	UpdateQuantityDto
} from "@/shared/types/server"

export const cartService = {
	getMyCart: async () => {
		const res = await instance.get<any, AxiosResponse<GetMyCartResponse>>(
			EnumApiRoute.GET_MY_CART
		)

		return res
	},

	addToCart: async (dto: AddCartItemDto) => {
		const res = await instance.post<any, AxiosResponse<boolean>>(
			EnumApiRoute.ADD_CART_ITEM,
			dto
		)

		return res
	},

	updateQuantity: async (dto: UpdateQuantityDto) => {
		const res = await instance.put<any, AxiosResponse<boolean>>(
			EnumApiRoute.UPDATE_CART_ITEM_QUANTITY,
			dto
		)

		return res
	},

	deleteFromCart: async (id: string) => {
		const res = await instance.delete<any, AxiosResponse<boolean>>(
			EnumApiRoute.DELETE_CART_ITEM + `/${id}`
		)

		return res
	},

	clearAllCart: async () => {
		const res = await instance.delete<any, AxiosResponse<boolean>>(
			EnumApiRoute.CLEAR_CART
		)

		return res
	}
}
