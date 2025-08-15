import { useEffect, useState } from "react";

import { useMyNotifications } from "@hooks/auth";
import { useNotificationsQueryParams } from "./useNotificationsQueryParams";

export const useNotificationsContent = () => {
	const { queryParams, updateQueryParams, isFilterUpdated } = useNotificationsQueryParams();

	const { notifications, notificationsLength, isNotificationsLoading, unReadLength } = useMyNotifications(queryParams, isFilterUpdated);

	const [length, setLength] = useState<number | undefined>(notificationsLength);

	useEffect(() => {
		if (typeof notificationsLength === "number") setLength(notificationsLength);
	}, [notificationsLength]);

	return {
		notifications,
		notificationsLength: length,
		isNotificationsLoading,
		updateQueryParams,
		unReadLength,
		queryParams,
	};
};
