import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import { EnumApiRoute } from "@/shared/lib/constants/routes"

export const paymentsService = {
	getAll: async () => {
		const res = await instance.get<AxiosResponse<any>>(
			EnumApiRoute.GET_ALL_PAYMENTS
		)

		return res.data
	},

	getExtraInfo: async (paymentId: string) => {
		const res = await instance.get<AxiosResponse<any>>(
			EnumApiRoute.GET_PAYMENT_EXTRA + `/${[paymentId]}`
		)

		return res.data
	}
}
