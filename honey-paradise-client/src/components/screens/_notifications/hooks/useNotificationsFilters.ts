import { SortAscIcon, SortDescIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { errorCatch } from "@/api/api-helper";
import { useMarkAsReadAllS } from "@/services/hooks/notifications";
import { EnumNotificationsSortType } from "@/shared/store/types/notifications-filter-store.type";
import { EnumNotificationType } from "@/shared/types/models";
import { useManageNotifications } from "@hooks/auth";
import { useNotificationsContext } from "@hooks/context";
import { getNotificationHeadingByType } from "@utils/get-notification-heading-by-type";
import type { AxiosError } from "axios";
import { useMemo } from "react";
import toast from "react-hot-toast";
import type { INotificationFilters } from "../types/notifications-filters.type";
import { useNotificationsQueryParams } from "./useNotificationsQueryParams";

export const useNotificationsFiltersWrapper = () => {
	const { markAsReadAllAsync, isAllMarkingAsRead } = useMarkAsReadAllS();

	const markAsReadAll = async () => {
		try {
			await markAsReadAllAsync();

			toast.success("Все уведомления помечены как прочитанные");
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			toast.error(errMsg);
		}
	};

	return {
		markAsReadAll,
		isAllMarkingAsRead,
	};
};

export const useNotificationsFilters = () => {
	const t = useTranslations("global.notifications.content");
	const locale = useLocale();

	const { queryParams, updateQueryParams, reset } = useNotificationsQueryParams();

	const notificationsFilters: INotificationFilters = useMemo(
		() => ({
			sortType: [
				{
					icon: SortDescIcon,
					type: EnumNotificationsSortType.NEWEST,
					label: t("filters.sortTypes.newest"),
				},
				{
					icon: SortAscIcon,
					type: EnumNotificationsSortType.OLDEST,
					label: t("filters.sortTypes.oldest"),
				},
			],
			notificationType: Object.values(EnumNotificationType).map(type => ({ type })),
		}),
		[locale]
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

	const heading = (type: EnumNotificationType) => getNotificationHeadingByType(type, t);

	return useMemo(
		() => ({
			onChangeSortType,
			onChangeNotificationsType,
			onChangeIsRead,
			queryParams,
			SortIcon,
			notificationsFilters,
			reset,
			heading,
			t,
		}),
		[queryParams.is_read, queryParams.sort, queryParams.types, locale]
	);
};

export const useNotificationsFiltersActions = () => {
	const t = useTranslations("global.notifications.content");

	const { isSelectMode, selectedIds, cancelSelectMode } = useNotificationsContext();
	const { deleteNotification, markAsArchived, markAsRead, isDeleting, isMarkingAsArchived, isMarkingAsRead } = useManageNotifications();

	const readSelected = async () => {
		try {
			await markAsRead(selectedIds);
			cancelSelectMode();
		} catch (error) {
			console.error(error);
		}
	};

	const deleteSelected = async () => {
		try {
			await deleteNotification(selectedIds);
			cancelSelectMode();
		} catch (error) {
			console.error(error);
		}
	};

	const archiveSelected = async () => {
		try {
			await markAsArchived(selectedIds);
			cancelSelectMode();
		} catch (error) {
			console.error(error);
		}
	};

	const isLoading = isMarkingAsArchived || isMarkingAsRead || isDeleting;

	return {
		isSelectMode,
		selectedLength: selectedIds.length,
		isLoading,
		cancelSelectMode,
		deleteSelected,
		archiveSelected,
		readSelected,
		t,
	};
};
