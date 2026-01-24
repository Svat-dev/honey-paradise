"use client"

import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import type { FC, PropsWithChildren } from "react"

import { Sheet, SheetTrigger } from "@/components/ui/common"

import { MenuSheetFooter, MenuSheetHeader, MenuSheetMain } from "./index"

const DynamicSheetContent = dynamic(() =>
	import("@/components/ui/common").then(mod => mod.SheetContent)
)

interface IMenuSheet extends PropsWithChildren {}

const MenuSheet: FC<IMenuSheet> = ({ children }) => {
	const t = useTranslations("layout.header.sidebarSheet")

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<DynamicSheetContent aria-description={t("aria.description")}>
				<MenuSheetHeader />
				<MenuSheetMain />
				<MenuSheetFooter />
			</DynamicSheetContent>
		</Sheet>
	)
}

export { MenuSheet }
