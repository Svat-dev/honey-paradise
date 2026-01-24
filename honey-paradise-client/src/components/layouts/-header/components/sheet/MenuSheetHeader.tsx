"use client"

import { useTranslations } from "next-intl"

import {
	SheetDescription,
	SheetHeader,
	SheetTitle
} from "@/components/ui/common"

import { ProfileBlock } from "../right-part/ProfileBlock"

const MenuSheetHeader = () => {
	const t = useTranslations("layout.header")

	return (
		<SheetHeader>
			<SheetTitle className="sr-only">{t("sidebarSheet.title")}</SheetTitle>
			<SheetDescription className="sr-only">
				{t("sidebarSheet.description")}
			</SheetDescription>

			<ProfileBlock t={t} picturePosition="left" />
		</SheetHeader>
	)
}

export { MenuSheetHeader }
