import type { FC } from "react"

import { Link } from "@/components/ui/common"

import type { IListItemContent } from "../types/data.type"

interface IListItem extends IListItemContent {}

const MiniListItem: FC<IListItem> = data => {
	const { link, title } = data

	return (
		<li className="transition-all hover:translate-x-2 hover:text-muted">
			<Link href={link} className="flex items-center gap-1 px-1 py-0.5">
				<data.icon size={20} />
				<p className="whitespace-nowrap leading-4">{title}</p>
			</Link>
		</li>
	)
}

export { MiniListItem }
