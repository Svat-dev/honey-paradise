import type { EnumNotificationType, INotificationUser } from "@/shared/types/models";

import type { EnumNotificationsSort } from "@/shared/store/types/notifications-filter-store.type";

export interface IGetAllNotificationsResponse {
	notifications: INotificationUser[];
	length: number;
	unReadLength: number;
}

export interface INotificationsQueryParams {
	sort?: EnumNotificationsSort;
	is_read?: string | boolean | null;
	type?: EnumNotificationType | null;
	page?: string | number;
	per_page: string | number;
}
