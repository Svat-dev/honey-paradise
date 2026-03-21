import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import { EnumApiRoute } from "@/shared/lib/constants/routes"
import type {
	CreateOrderResponse,
	GetAllOrdersResponse,
	GetExtraOrderInfo
} from "@/shared/types/server"

export const orderService = {
	getAll: async () => {
		const res = await instance.get<any, AxiosResponse<GetAllOrdersResponse[]>>(
			EnumApiRoute.GET_ALL_ORDERS
		)

		return res
	},

	getExtraInfo: async (orderId: string) => {
		const res = await instance.get<any, AxiosResponse<GetExtraOrderInfo>>(
			EnumApiRoute.GET_ORDER_EXTRA_INFO(orderId)
		)

		return res
	},

	create: async () => {
		const res = await instance.post<any, AxiosResponse<CreateOrderResponse>>(
			EnumApiRoute.CREATE_ORDER,
			{}
		)

		return res
	}
}
