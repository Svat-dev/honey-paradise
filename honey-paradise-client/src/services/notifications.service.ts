import type {
	IGetAllNotificationsResponse,
	INotificationsIdsDto,
	INotificationsQueryParams,
	IUpdateNotificationsSettingsDto,
} from "./types/notifications-service.type";

import { instance } from "@/api/instance";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const notificationsService = {
	getAll: async (queryData = {} as INotificationsQueryParams) => {
		const res = await instance.get<any, AxiosResponse<IGetAllNotificationsResponse>>(EnumApiRoute.NOTIFICATIONS_GET_ALL, {
			params: { ...queryData, types: queryData.types?.join(",") },
		});

		return res;
	},

	updateSettings: async (dto: IUpdateNotificationsSettingsDto) => {
		const res = await instance.put<any, AxiosResponse<boolean>>(EnumApiRoute.UPDATE_NOTIFICATIONS_SETTINGS, dto);

		return res;
	},

	markAsRead: async (dto: INotificationsIdsDto) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.MARK_AS_READ, dto);

		return res;
	},

	markAsReadAll: async () => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.MARK_AS_READ_ALL);

		return res;
	},

	markAsArchived: async (dto: INotificationsIdsDto) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.MARK_AS_ARCHIVED, dto);

		return res;
	},

	delete: async (ids: string[]) => {
		const res = await instance.delete<any, AxiosResponse<boolean>>(EnumApiRoute.DELETE_NOTIFICATIONS, { data: { ids } });

		return res;
	},
};
