import type { IGetAllNotificationsResponse, INotificationsQueryParams } from "./types/notifications-service.type";

import { instance } from "@/api/instance";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const notificationsService = {
	getAll: async (queryData = {} as INotificationsQueryParams) => {
		const res = await instance.get<any, AxiosResponse<IGetAllNotificationsResponse>>(EnumApiRoute.NOTIFICATIONS_GET_ALL, {
			params: queryData,
		});

		return res;
	},

	markAsRead: async (ids: string[]) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.MARK_AS_READ, { ids });

		return res;
	},
};
