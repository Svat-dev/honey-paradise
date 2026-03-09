import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import { EnumApiRoute } from "@/shared/lib/constants/routes"
import { GetAllPaymentsResponse } from "@/shared/types/server"

export const paymentsService = {
	getAll: async () => {
		const res = await instance.get<
			any,
			AxiosResponse<GetAllPaymentsResponse[]>
		>(EnumApiRoute.GET_ALL_PAYMENTS)

		return res.data
	}
}
