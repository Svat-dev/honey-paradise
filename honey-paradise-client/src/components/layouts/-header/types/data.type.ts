import { EnumLanguages } from "@/shared/lib/i18n";
import type { LucideIcon } from "lucide-react";

export interface ISheetLinks {
	link: string;
	title: string;
	icon: LucideIcon;
	isNotifications?: boolean;
}

export interface ILanguagesList {
	language: string;
	value: EnumLanguages;
	isCurrent: boolean;
}
