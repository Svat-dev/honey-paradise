import {
	ArrowUpNarrowWideIcon,
	BookOpenIcon,
	InfoIcon,
	Layers3Icon,
	LibraryBigIcon,
	ListPlusIcon,
	ScrollTextIcon,
	ShieldAlertIcon,
} from "lucide-react";

import type { INavList } from "./types/data.type";

export const navListData: INavList[] = [
	{
		topic: "О мёде",
		content: [
			{
				icon: BookOpenIcon,
				link: "/",
				title: "Немного Википедии",
			},
			{
				icon: LibraryBigIcon,
				link: "/",
				title: "Различие меда",
			},
			{
				icon: ScrollTextIcon,
				link: "/",
				title: "Сорта меда",
			},
		],
	},
	{
		topic: "Каталог",
		content: [
			{
				icon: ArrowUpNarrowWideIcon,
				link: "/",
				title: "Популярное",
			},
			{
				icon: ListPlusIcon,
				link: "/",
				title: "Новое",
			},
			{
				icon: Layers3Icon,
				link: "/",
				title: "Все продукты",
			},
		],
	},
	{
		topic: "Информация",
		content: [
			{
				icon: InfoIcon,
				link: "/",
				title: "О нас",
			},
			{
				icon: ShieldAlertIcon,
				link: "/",
				title: `Политика конфиденциальности`,
			},
		],
	},
];
