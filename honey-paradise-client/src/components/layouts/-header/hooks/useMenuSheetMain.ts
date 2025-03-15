import { BellIcon, CircleUserRoundIcon, ClipboardListIcon } from "lucide-react";

import { useTranslations } from "next-intl";
import type { ISheetLinks } from "../types/data.type";

export const useMenuSheetMain = () => {
	const t = useTranslations("layout.header");

	const sheetLinksData: ISheetLinks[] = [
		{
			title: t("links.profile"),
			link: "/",
			icon: CircleUserRoundIcon,
		},
		{
			title: t("links.orders"),
			link: "/",
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
