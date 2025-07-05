"use client";

import { ListItem } from "./components/ListItem";
import { useAccountSidebar } from "./hooks/useAccountSidebar";

const AccountSidebar = () => {
	const { data, height } = useAccountSidebar();

	return (
		<aside className="tw-bg-primary tw-sticky tw-left-0 tw-top-[3.75rem]" style={{ height }}>
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
