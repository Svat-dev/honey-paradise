"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import type { FC, PropsWithChildren } from "react";
import { MenuSheetFooter, MenuSheetHeader, MenuSheetMain } from "./index";

interface IMenuSheet extends PropsWithChildren {}

const MenuSheet: FC<IMenuSheet> = ({ children }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="" aria-description="Навигационное меню">
				<MenuSheetHeader />
				<MenuSheetMain />
				<MenuSheetFooter />
			</SheetContent>
		</Sheet>
	);
};

export { MenuSheet };
