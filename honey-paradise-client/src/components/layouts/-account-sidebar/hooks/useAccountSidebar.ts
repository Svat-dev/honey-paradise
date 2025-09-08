import { BellIcon, ClipboardListIcon, LinkIcon, SettingsIcon, ShoppingCartIcon } from "lucide-react";
import { useLayoutEffect, useMemo, useState } from "react";

import { EnumAppRoute } from "@constants/routes";
import { useLanguage } from "@i18n/hooks";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { IAccountNavigation } from "../types/data.type";

export const useAccountSidebar = () => {
	const t = useTranslations("layout.account-sidebar.links");
	const { locale } = useLanguage();
	const pathname = usePathname();

	const [height, setHeight] = useState<string>("auto");

	useLayoutEffect(() => {
		if (typeof window !== "undefined") setHeight(`${window.innerHeight - 60}px`);
	}, []);

	const data: IAccountNavigation[] = useMemo(
		() => [
			{
				title: t("settings"),
				icon: SettingsIcon,
				route: EnumAppRoute.SETTINGS,
				isCurrent: pathname === EnumAppRoute.SETTINGS,
			},
			{
				title: t("connections"),
				icon: LinkIcon,
				route: EnumAppRoute.CONNECTIONS,
				isCurrent: pathname === EnumAppRoute.CONNECTIONS,
			},
			{
				title: t("notifications"),
				icon: BellIcon,
				route: EnumAppRoute.NOTIFICATIONS,
				isCurrent: pathname === EnumAppRoute.NOTIFICATIONS,
			},
			{
				title: t("cart"),
				icon: ShoppingCartIcon,
				route: EnumAppRoute.MY_CART,
				isCurrent: pathname === EnumAppRoute.MY_CART,
			},
			{
				title: t("orders"),
				icon: ClipboardListIcon,
				route: EnumAppRoute.MY_ORDERS,
				isCurrent: pathname === EnumAppRoute.MY_ORDERS,
			},
		],
		[pathname, locale]
	);

	return { data, height };
};
