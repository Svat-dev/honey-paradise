import { EnumApiRoute } from "@constants/routes"
import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import type {
	DefaultResponse,
	GetAllNotificationsResponse,
	NotificationsIdsDto,
	UpdateNotificationsSettingsDto
} from "@/shared/types/server"

import type { INotificationsQueryParams } from "./types/notifications-service.type"

export const notificationsService = {
	getAll: async (queryData = {} as INotificationsQueryParams) => {
		const res = await instance.get<
			any,
			AxiosResponse<GetAllNotificationsResponse>
		>(EnumApiRoute.GET_NOTIFICATIONS, {
			params: { ...queryData, types: queryData.types?.join(",") }
		})

		return res
	},

	updateSettings: async (dto: UpdateNotificationsSettingsDto) => {
		const res = await instance.put<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.UPDATE_NOTIFICATIONS,
			dto
		)

		return res
	},

	markAsRead: async (dto: NotificationsIdsDto) => {
		const res = await instance.patch<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.MARK_AS_READ,
			dto
		)

		return res
	},

	markAsReadAll: async () => {
		const res = await instance.patch<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.MARK_AS_READ_ALL
		)

		return res
	},

	markAsArchived: async (dto: NotificationsIdsDto) => {
		const res = await instance.patch<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.MARK_AS_ARCHIVED,
			dto
		)

		return res
	},

	delete: async (ids: string[]) => {
		const res = await instance.delete<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.DELETE_NOTIFICATION,
			{ data: { ids } }
		)

		return res
	}
}
