"use client";

import { ListItem } from "./components/ListItem";
import { useAccountSidebar } from "./hooks/useAccountSidebar";

const AccountSidebar = () => {
	const { data } = useAccountSidebar();

	return (
		<aside className="tw-h-full tw-bg-primary tw-sticky">
			<nav className="tw-mt-6">
				<ul className="tw-list-none tw-px-6">
					{data.map(item => (
						<ListItem data={item} key={item.route} />
					))}
				</ul>
			</nav>
		</aside>
	);
};

export { AccountSidebar };
