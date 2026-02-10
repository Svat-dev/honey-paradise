import { EnumApiRoute } from "@constants/routes"
import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import type { GetAllConnectionsResponse } from "@/shared/types/server"

export const providerService = {
	getAll: async () => {
		const res = await instance.get<
			any,
			AxiosResponse<GetAllConnectionsResponse[]>
		>(EnumApiRoute.ALL_CONNECTIONS)

		return res
	},

	delete: async (pid: string) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(
			EnumApiRoute.DISCONNECT,
			{ pid }
		)

		return res
	}
}
