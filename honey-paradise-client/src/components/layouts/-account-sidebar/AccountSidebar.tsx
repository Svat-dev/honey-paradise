"use client"

import { ListItem } from "./components/ListItem"
import { useAccountSidebar } from "./hooks/useAccountSidebar"

const AccountSidebar = () => {
	const { data } = useAccountSidebar()

	return (
		<aside className="sticky top-[3.75rem] h-[calc(100vh-3.75rem)] w-fit bg-primary print:hidden">
			<nav className="mt-6">
				<ul className="list-none px-6">
					{data.map(item => (
						<ListItem data={item} key={item.route} />
					))}
				</ul>
			</nav>
		</aside>
	)
}

export { AccountSidebar }
