"use client";

import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui";

import { useTranslations } from "next-intl";
import { ProfileBlock } from "../ProfileBlock";

const MenuSheetHeader = () => {
	const t = useTranslations("layout.header");

	return (
		<SheetHeader>
			<SheetTitle className="tw-sr-only">Навигационное меню профиля</SheetTitle>
			<SheetDescription className="tw-sr-only">Навигационное меню профиля</SheetDescription>

			<ProfileBlock t={t} picturePosition="left" />
		</SheetHeader>
	);
};

export { MenuSheetHeader };
