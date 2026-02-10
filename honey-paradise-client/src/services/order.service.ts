import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import { EnumApiRoute } from "@/shared/lib/constants/routes"
import type {
	CreateOrderResponse,
	GetAllOrdersResponse
} from "@/shared/types/server"

export const orderService = {
	getAll: async () => {
		const res = await instance.get<any, AxiosResponse<GetAllOrdersResponse[]>>(
			EnumApiRoute.GET_USER_ORDERS
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
