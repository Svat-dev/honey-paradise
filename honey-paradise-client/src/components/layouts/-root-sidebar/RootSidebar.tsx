import { getTranslations } from "next-intl/server";
import type { FC } from "react";
import { ChangeThemeButton } from "./components/ChangeThemeButton";
import { ListItem } from "./components/ListItem";
import { LogoutButton } from "./components/logout-button/LogoutButton";
import { getNavListData } from "./data";

interface IRootSidebarSidebar {}

const RootSidebar: FC<IRootSidebarSidebar> = async ({}) => {
	const t = await getTranslations("layout.root-sidebar");
	const data = await getNavListData();

	return (
		<aside className="w-[270px] h-full bg-primary sticky bottom-0">
			<div className="px-4 py-4">
				<nav className="mb-7">
					<h3 className="text-lg font-medium">{t("list.title")}:</h3>

					<ul className="list-none ml-3 mt-3">
						{data.map(item => (
							<ListItem key={item.topic} content={item.content} topic={item.topic} />
						))}
					</ul>
				</nav>

				<div>
					<ChangeThemeButton />
					<LogoutButton />
				</div>
			</div>
		</aside>
	);
};

export { RootSidebar };
