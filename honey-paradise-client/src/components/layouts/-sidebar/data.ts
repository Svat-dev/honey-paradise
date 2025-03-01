"use server";

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
import { getTranslations } from "next-intl/server";

export async function getNavListData(): Promise<INavList[]> {
	const topics = await getTranslations("layout.sidebar.list.content.topics");
	const links = await getTranslations("layout.sidebar.list.content.links");

	const navListData: INavList[] = [
		{
			topic: topics("honeyAbout"),
			content: [
				{
					icon: BookOpenIcon,
					link: "/",
					title: links("wiki"),
				},
				{
					icon: LibraryBigIcon,
					link: "/",
					title: links("deference"),
				},
				{
					icon: ScrollTextIcon,
					link: "/",
					title: links("sorts"),
				},
			],
		},
		{
			topic: topics("catalog"),
			content: [
				{
					icon: ArrowUpNarrowWideIcon,
					link: "/",
					title: links("popular"),
				},
				{
					icon: ListPlusIcon,
					link: "/",
					title: links("new"),
				},
				{
					icon: Layers3Icon,
					link: "/",
					title: links("allProducts"),
				},
			],
		},
		{
			topic: topics("information"),
			content: [
				{
					icon: InfoIcon,
					link: "/",
					title: links("about"),
				},
				{
					icon: ShieldAlertIcon,
					link: "/",
					title: links("privacyPolicy"),
				},
			],
		},
	];

	return navListData;
}
