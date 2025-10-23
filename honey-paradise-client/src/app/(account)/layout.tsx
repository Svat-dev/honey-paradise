import { AccountSidebar } from "@/components/layouts/-account-sidebar/AccountSidebar";
import { Header } from "@/components/layouts/-header/Header";
import { EnumAppRoute } from "@constants/routes";
import { getViewport } from "@utils/base";
import type { Viewport } from "next";
import type { ReactNode } from "react";

export const viewport: Viewport = getViewport(false, 1);

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<Header route={EnumAppRoute.ACCOUNT} />
			<main className="flex relative">
				<AccountSidebar />
				{children}
			</main>
		</>
	);
}
