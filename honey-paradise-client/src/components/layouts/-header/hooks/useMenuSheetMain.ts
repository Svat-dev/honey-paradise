import { BellIcon, CircleUserRoundIcon, ClipboardListIcon } from "lucide-react";

import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { useTranslations } from "next-intl";
import type { ISheetLinks } from "../types/data.type";

export const useMenuSheetMain = () => {
	const t = useTranslations("layout.header");

	const sheetLinksData: ISheetLinks[] = [
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
			link: "/",
			icon: BellIcon,
			isNotifications: true,
		},
	];

	return {
		data: sheetLinksData,
		t,
	};
};
