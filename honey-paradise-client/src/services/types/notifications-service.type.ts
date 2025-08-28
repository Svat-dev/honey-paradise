import type { EnumNotificationType, INotificationUser } from "@/shared/types/models";

import type { EnumNotificationsSortType } from "@/shared/store/types/notifications-filter-store.type";

export interface IGetAllNotificationsResponse {
	notifications: INotificationUser[];
	length: number;
	unReadLength: number;
}

export interface INotificationsIdsDto {
	ids: string[];
	single?: boolean;
}

export interface INotificationsQueryParams {
	sort?: EnumNotificationsSortType;
	is_read?: string | boolean | null;
	types?: EnumNotificationType[];
	page?: string | number;
	per_page: string | number;
}

export interface IUpdateNotificationsSettingsDto {
	enabled?: boolean;
	withSound?: boolean;

	siteNotificationsType?: boolean;
	telegramNotificationsType?: boolean;
}
