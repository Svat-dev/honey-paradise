import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { useMyNotifications } from "@hooks/auth";
import { useLanguage } from "@i18n/hooks";
import { useNotificationsQueryParams } from "./useNotificationsQueryParams";

export const useNotificationsContent = () => {
	const t = useTranslations("global.notifications.content");
	const { locale } = useLanguage();

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
			t,
		}),
		[notifications?.length, length, isNotificationsLoading, unReadLength, queryParams, locale]
	);
};
