import { BellIcon, CircleUserRoundIcon, ClipboardListIcon } from "lucide-react";

import { EnumAppRoute } from "@constants/routes";
import { useMyNotifications } from "@hooks/auth";
import { useLanguage } from "@i18n/hooks";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import type { ISheetLinks } from "../types/data.type";

export const useMenuSheetMain = () => {
	const t = useTranslations("layout.header");
	const { locale } = useLanguage(false);
	const { unReadLength, isNotificationsLoading } = useMyNotifications();

	const sheetLinksData: ISheetLinks[] = useMemo(
		() => [
			{
				title: t("links.profile"),
				link: EnumAppRoute.SETTINGS,
				icon: CircleUserRoundIcon,
			},
			{
				title: t("links.orders"),
				link: EnumAppRoute.MY_ORDERS,
				icon: ClipboardListIcon,
			},
			{
				title: t("links.notifications"),
				link: EnumAppRoute.NOTIFICATIONS,
				icon: BellIcon,
				isNotifications: true,
			},
		],
		[locale]
	);

	return {
		data: sheetLinksData,
		unReadLength,
		isNotificationsLoading,
		t,
	};
};
