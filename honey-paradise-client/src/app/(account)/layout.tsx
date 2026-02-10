import { EnumAppRoute } from "@constants/routes"
import { getViewport } from "@utils/base"
import type { Viewport } from "next"
import type { ReactNode } from "react"

import { AccountSidebar } from "@/components/layouts/-account-sidebar/AccountSidebar"
import { Header } from "@/components/layouts/-header/Header"
import { Container } from "@/components/ui/layouts"

export const viewport: Viewport = getViewport(false, 1)

export default function AccountLayout({
	children
}: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<Header route={EnumAppRoute.ACCOUNT} />
			<main>
				<Container className="relative flex">
					<AccountSidebar />
					{children}
				</Container>
			</main>
		</>
	)
}
