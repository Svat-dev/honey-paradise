import type { EnumAppRoute } from "@constants/routes"
import type { LucideIcon } from "lucide-react"

export interface IAccountNavigation {
	title: string
	route: EnumAppRoute
	icon: LucideIcon
	isCurrent?: boolean
}
