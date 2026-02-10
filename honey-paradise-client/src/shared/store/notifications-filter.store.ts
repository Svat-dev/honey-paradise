import { create } from "zustand"

import { GetMyNotificationResponseType } from "../types/server"

import {
	EnumNotificationsSortType,
	type INotificationsFilterStore
} from "./types/notifications-filter-store.type"

const initialQS: Pick<INotificationsFilterStore, "queryParams"> = {
	queryParams: {
		per_page: 6,
		page: 1,
		is_read: null,
		sort: EnumNotificationsSortType.NEWEST,
		types: Object.values(GetMyNotificationResponseType).filter(
			item => item !== GetMyNotificationResponseType.TELEGRAM
		)
	}
}

export const notificationsFilterStore = create<INotificationsFilterStore>(
	set => ({
		...initialQS,
		isFilterUpdated: false,

		updateQueryParam: ({ key, value }) =>
			set(state => ({
				queryParams: { ...state.queryParams, [key]: value },
				isFilterUpdated: true
			})),

		reset: () =>
			set(() => ({
				queryParams: {
					...initialQS.queryParams,
					types: Object.values(GetMyNotificationResponseType).filter(
						item => item !== GetMyNotificationResponseType.TELEGRAM
					)
				},
				isFilterUpdated: true
			}))
	})
)
