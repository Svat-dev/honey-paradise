import { EnumApiRoute } from "@constants/routes"
import type { AxiosResponse } from "axios"

import { defaultInstance, instance } from "@/api/instance"
import type { ISession } from "@/shared/types/models/session.type"
import { DefaultResponse } from "@/shared/types/server"

export const sessionService = {
	clearSession: async () => {
		const res = await defaultInstance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.CLEAR_CURRENT_SESSION
		)

		return res
	},

	getByUser: async () => {
		const res = await instance.get<ISession[]>(EnumApiRoute.GET_ALL_SESSIONS)

		return res
	},

	getCurrent: async () => {
		const res = await instance.get<ISession>(EnumApiRoute.GET_CURRENT_SESSION)

		return res
	},

	removeSession: async (sessionId: string) => {
		const res = await instance.delete<AxiosResponse<any, boolean>>(
			EnumApiRoute.DELETE_SESSION(sessionId)
		)

		return res
	},

	removeAllSessions: async () => {
		const res = await instance.delete<AxiosResponse<any, boolean>>(
			EnumApiRoute.DELETE_ALL_SESSIONS
		)

		return res
	}
}
