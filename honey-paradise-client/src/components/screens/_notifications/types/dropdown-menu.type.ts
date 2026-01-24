import type { LucideIcon } from "lucide-react"

export interface INotificationDMData {
	text: string
	Icon: LucideIcon
	onClick?: Function
	shortcut?: string
	delete?: boolean
}
