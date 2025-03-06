import { BellIcon, CircleUserRoundIcon, ClipboardListIcon } from "lucide-react";

import type { ISheetLinks } from "../types/data.type";

export const useMenuSheetMain = () => {
	const sheetLinksData: ISheetLinks[] = [
		{
			title: "Профиль",
			link: "/",
			icon: CircleUserRoundIcon,
		},
		{
			title: "Заказы",
			link: "/",
			icon: ClipboardListIcon,
		},
		{
			title: "Уведомления",
			link: "/",
			icon: BellIcon,
		},
	];

	return {
		data: sheetLinksData,
	};
};
