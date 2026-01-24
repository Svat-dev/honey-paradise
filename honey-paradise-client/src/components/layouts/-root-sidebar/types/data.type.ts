import type { LucideIcon } from "lucide-react"

export interface IListItemContent {
	title: string
	link: string
	icon: LucideIcon
}

export interface INavList {
	topic: string
	content: IListItemContent[]
}
