"use client";

import { ListItem } from "./components/ListItem";
import { useAccountSidebar } from "./hooks/useAccountSidebar";

const AccountSidebar = () => {
	const { data, height } = useAccountSidebar();

	return (
		<aside className="bg-primary sticky left-0 top-[3.75rem]" style={{ height }}>
			<nav className="mt-6">
				<ul className="list-none px-6">
					{data.map(item => (
						<ListItem data={item} key={item.route} />
					))}
				</ul>
			</nav>
		</aside>
	);
};

export { AccountSidebar };
