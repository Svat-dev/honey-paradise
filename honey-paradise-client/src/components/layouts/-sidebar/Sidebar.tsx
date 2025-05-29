import { getTranslations } from "next-intl/server";
import { type FC } from "react";
import { ChangeThemeButton } from "./components/ChangeThemeButton";
import { ListItem } from "./components/ListItem";
import { LogoutButton } from "./components/logout-button/LogoutButton";
import { getNavListData } from "./data";

interface ISidebar {}

const Sidebar: FC<ISidebar> = async ({}) => {
	const t = await getTranslations("layout.sidebar");
	const data = await getNavListData();

	return (
		<aside className="tw-w-[270px] tw-h-full tw-bg-primary tw-sticky tw-bottom-0">
			<div className="tw-px-4 tw-py-4">
				<nav className="tw-mb-7">
					<h3 className="tw-text-lg tw-font-medium">{t("list.title")}:</h3>

					<ul className="tw-ml-3 tw-mt-3">
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

export { Sidebar };
