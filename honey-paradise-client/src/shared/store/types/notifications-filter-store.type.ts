import type { INotificationsQueryParams } from "@/services/types/notifications-service.type";

export interface INotificationsFilterStore extends IActions {
	queryParams: INotificationsQueryParams;
	isFilterUpdated: boolean;
}

export enum EnumNotificationsSortType {
	OLDEST = "OLDEST",
	NEWEST = "NEWEST",
}

interface IActions {
	updateQueryParam: (data: { key: keyof INotificationsQueryParams; value: string | string[] }) => void;
	reset: VoidFunction;
}
