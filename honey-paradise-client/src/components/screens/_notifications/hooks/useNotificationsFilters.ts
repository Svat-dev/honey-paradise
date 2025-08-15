import { SortAscIcon, SortDescIcon } from "lucide-react";

import { EnumNotificationsSortType } from "@/shared/store/types/notifications-filter-store.type";
import { EnumNotificationType } from "@/shared/types/models";
import { useMemo } from "react";
import type { INotificationFilters } from "../types/notifications-filters.type";
import { useNotificationsQueryParams } from "./useNotificationsQueryParams";

export const useNotificationsFilters = () => {
	const { queryParams, updateQueryParams, reset } = useNotificationsQueryParams();

	const notificationsFilters: INotificationFilters = useMemo(
		() => ({
			sortType: [
				{
					icon: SortAscIcon,
					type: EnumNotificationsSortType.NEWEST,
					label: "Новые",
				},
				{
					icon: SortDescIcon,
					type: EnumNotificationsSortType.OLDEST,
					label: "Старые",
				},
			],
			notificationType: Object.values(EnumNotificationType).map(type => ({ type })),
		}),
		[]
	);

	const onChangeSortType = (type: EnumNotificationsSortType) => updateQueryParams("sort", type);

	const onChangeIsRead = (isRead: boolean) => updateQueryParams("is_read", String(isRead));

	const onChangeNotificationsType = (checked: boolean, type: EnumNotificationType) => {
		const types = queryParams.types!;

		if (checked) types.push(type);
		else {
			const index = types.indexOf(type);
			if (index! > -1) types.splice(index!, 1);
		}

		return updateQueryParams("types", types.join(","));
	};

	const SortIcon = notificationsFilters.sortType.find(item => item.type === queryParams.sort)?.icon || SortDescIcon;

	return {
		notificationsFilters,
		onChangeSortType,
		onChangeNotificationsType,
		onChangeIsRead,
		queryParams,
		SortIcon,
		reset,
	};
};
