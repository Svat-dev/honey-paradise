import { type FC } from "react";
import { ListItem } from "./components/ListItem";
import { navListData } from "./data";

interface ISidebar {}

const Sidebar: FC<ISidebar> = ({}) => {
	return (
		<nav className="tw-w-fit tw-h-full tw-bg-primary tw-sticky tw-bottom-0">
			<div className="tw-h-full tw-px-4 tw-py-4">
				<p className="tw-text-lg tw-font-medium">Содержание:</p>

				<ul className="tw-ml-3 tw-mt-3">
					{navListData.map(item => (
						<ListItem key={item.topic} content={item.content} topic={item.topic} />
					))}
				</ul>
			</div>
		</nav>
	);
};

export { Sidebar };
