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

import { EnumAppRoute } from "@constants/routes";
import { getTranslations } from "next-intl/server";
import type { INavList } from "./types/data.type";

export async function getNavListData(): Promise<INavList[]> {
	const topics = await getTranslations("layout.root-sidebar.list.content.topics");
	const links = await getTranslations("layout.root-sidebar.list.content.links");

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
					link: EnumAppRoute.CATALOG,
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
					link: EnumAppRoute.PRIVACY_POLICY,
					title: links("privacyPolicy"),
				},
			],
		},
	];

	return navListData;
}
