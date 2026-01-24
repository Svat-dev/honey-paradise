import type { LucideIcon } from "lucide-react"

import type { EnumNotificationsSortType } from "@/shared/store/types/notifications-filter-store.type"
import { GetMyNotificationResponseType } from "@/shared/types/server"

export interface INotificationFilters {
	sortType: ISortType[]
	notificationType: INotificationsType[]
}

interface ISortType {
	type: EnumNotificationsSortType
	icon: LucideIcon
	label: string
}

interface INotificationsType {
	type: GetMyNotificationResponseType
}
