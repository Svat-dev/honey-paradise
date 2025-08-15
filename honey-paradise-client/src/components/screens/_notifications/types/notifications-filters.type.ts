import type { EnumNotificationsSortType } from "@/shared/store/types/notifications-filter-store.type";
import type { EnumNotificationType } from "@/shared/types/models";
import type { LucideIcon } from "lucide-react";

export interface INotificationFilters {
	sortType: ISortType[];
	notificationType: INotificationsType[];
}

interface ISortType {
	type: EnumNotificationsSortType;
	icon: LucideIcon;
	label: string;
}

interface INotificationsType {
	type: EnumNotificationType;
}
