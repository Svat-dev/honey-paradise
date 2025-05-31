import { type FC } from "react";
import type { INavList } from "../types/data.type";
import { MiniListItem } from "./MiniListItem";

interface IListItem extends INavList {}

const ListItem: FC<IListItem> = ({ content, topic }) => {
	return (
		<li className="tw-mb-3">
			<p className="tw-font-medium">{topic}</p>
			<ul className="tw-list-none tw-ml-4 tw-flex tw-flex-col">
				{content.map(item => {
					const { icon, link, title } = item;

					return <MiniListItem key={title} icon={icon} link={link} title={title} />;
				})}
			</ul>
		</li>
	);
};

export { ListItem };
