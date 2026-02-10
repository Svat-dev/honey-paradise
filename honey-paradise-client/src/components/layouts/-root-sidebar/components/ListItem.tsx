import type { FC } from "react"

import type { INavList } from "../types/data.type"

import { MiniListItem } from "./MiniListItem"

interface IListItem extends INavList {}

const ListItem: FC<IListItem> = ({ content, topic }) => {
	return (
		<li className="mb-3">
			<p className="font-medium">{topic}</p>
			<ul className="ml-4 flex list-none flex-col">
				{content.map(item => {
					const { icon, link, title } = item

					return (
						<MiniListItem key={title} icon={icon} link={link} title={title} />
					)
				})}
			</ul>
		</li>
	)
}

export { ListItem }
