"use client";

import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/common";

import { ProfileBlock } from "../right-part/ProfileBlock";
import { useTranslations } from "next-intl";

const MenuSheetHeader = () => {
	const t = useTranslations("layout.header");

	return (
		<SheetHeader>
			<SheetTitle className="tw-sr-only">{t("sidebarSheet.title")}</SheetTitle>
			<SheetDescription className="tw-sr-only">{t("sidebarSheet.description")}</SheetDescription>

			<ProfileBlock t={t} picturePosition="left" />
		</SheetHeader>
	);
};

export { MenuSheetHeader };
