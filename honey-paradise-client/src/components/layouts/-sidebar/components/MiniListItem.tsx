import { type FC } from "react";
import type { IListItemContent } from "../types/data.type";

interface IListItem extends IListItemContent {}

const MiniListItem: FC<IListItem> = data => {
	const { link, title } = data;

	return (
		<li className="tw-transition-all hover:tw-translate-x-2 hover:tw-text-muted">
			<a href={link} className="tw-px-1 tw-py-0.5 tw-flex tw-items-center tw-gap-1">
				<data.icon size={20} />
				<p className="tw-max-w-44 tw-leading-4">{title}</p>
			</a>
		</li>
	);
};

export { MiniListItem };
