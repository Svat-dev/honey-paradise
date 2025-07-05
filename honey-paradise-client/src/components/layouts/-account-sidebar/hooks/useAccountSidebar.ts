import { ClipboardListIcon, LinkIcon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { EnumAppRoute } from "@constants/routes";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { IAccountNavigation } from "../types/data.type";

export const useAccountSidebar = () => {
	const pathname = usePathname();
	const t = useTranslations("layout.account-sidebar");

	const [height, setHeight] = useState<string>("auto");

	useEffect(() => {
		if (typeof window !== "undefined") setHeight(`${window.innerHeight - 60}px`);
	}, []);

	const data: IAccountNavigation[] = [
		{
			title: "Настройки",
			icon: SettingsIcon,
			route: EnumAppRoute.SETTINGS,
			isCurrent: pathname === EnumAppRoute.SETTINGS,
		},
		{
			title: "Связанные учетные записи",
			icon: LinkIcon,
			route: EnumAppRoute.CONNECTIONS,
			isCurrent: pathname === EnumAppRoute.CONNECTIONS,
		},
		{
			title: "Мои заказы",
			icon: ClipboardListIcon,
			route: EnumAppRoute.MY_ORDERS,
			isCurrent: pathname === EnumAppRoute.MY_ORDERS,
		},
	];

	return { data, height };
};
