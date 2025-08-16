import { useEffect, useMemo, useState } from "react";

import { useMyNotifications } from "@hooks/auth";
import { useNotificationsQueryParams } from "./useNotificationsQueryParams";

export const useNotificationsContent = () => {
	const { queryParams, updateQueryParams, isFilterUpdated } = useNotificationsQueryParams();

	const { notifications, notificationsLength, isNotificationsLoading, unReadLength } = useMyNotifications(queryParams, isFilterUpdated);

	const [length, setLength] = useState<number | undefined>(notificationsLength);

	useEffect(() => {
		if (typeof notificationsLength === "number") setLength(notificationsLength);
	}, [notificationsLength]);

	useEffect(() => {
		document.body.setAttribute("id", "none-scrollable-2");
	}, []);

	return useMemo(
		() => ({
			notifications,
			notificationsLength: length,
			isNotificationsLoading,
			updateQueryParams,
			unReadLength,
			queryParams,
		}),
		[notifications?.length, length, isNotificationsLoading, unReadLength, queryParams]
	);
};
