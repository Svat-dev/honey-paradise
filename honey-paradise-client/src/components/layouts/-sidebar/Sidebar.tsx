import { type FC } from "react";
import { ChangeThemeButton } from "./components/ChangeThemeButton";
import { ListItem } from "./components/ListItem";
import { LogoutButton } from "./components/LogoutButton";
import { navListData } from "./data";

interface ISidebar {}

const Sidebar: FC<ISidebar> = ({}) => {
	return (
		<aside className="tw-w-fit tw-h-full tw-bg-primary tw-sticky tw-bottom-0">
			<div className="tw-px-4 tw-py-4">
				<nav className="tw-mb-7">
					<p className="tw-text-lg tw-font-medium">Содержание:</p>

					<ul className="tw-ml-3 tw-mt-3">
						{navListData.map(item => (
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
