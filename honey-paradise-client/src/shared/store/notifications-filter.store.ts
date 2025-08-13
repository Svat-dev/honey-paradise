import { create } from "zustand";
import { EnumNotificationsSort, type INotificationsFilterStore } from "./types/notifications-filter-store.type";

const initialQS: Pick<INotificationsFilterStore, "queryParams"> = {
	queryParams: {
		per_page: 5,
		page: 1,
		is_read: null,
		sort: EnumNotificationsSort.NEWEST,
		type: null,
	},
};

export const notificationsFilterStore = create<INotificationsFilterStore>(set => ({
	...initialQS,
	isFilterUpdated: false,

	updateQueryParam: ({ key, value }) =>
		set(state => ({
			queryParams: { ...state.queryParams, [key]: value },
			isFilterUpdated: true,
		})),

	reset: () => set(() => ({ ...initialQS, isFilterUpdated: true })),
}));
