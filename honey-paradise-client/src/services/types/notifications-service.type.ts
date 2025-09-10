import type { EnumNotificationsSortType } from "@/shared/store/types/notifications-filter-store.type";
import type { GetMyNotificationResponseType } from "@/shared/types/server";

export interface INotificationsQueryParams {
	sort?: EnumNotificationsSortType;
	is_read?: string | boolean | null;
	types?: GetMyNotificationResponseType[];
	page?: string | number;
	per_page: string | number;
}
