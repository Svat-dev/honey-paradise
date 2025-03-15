"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import type { FC, PropsWithChildren } from "react";
import { MenuSheetFooter, MenuSheetHeader, MenuSheetMain } from "./index";

import { useTranslations } from "next-intl";

interface IMenuSheet extends PropsWithChildren {}

const MenuSheet: FC<IMenuSheet> = ({ children }) => {
	const t = useTranslations("layout.header.sidebarSheet");

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent aria-description={t("aria.description")}>
				<MenuSheetHeader />
				<MenuSheetMain />
				<MenuSheetFooter />
			</SheetContent>
		</Sheet>
	);
};

export { MenuSheet };
