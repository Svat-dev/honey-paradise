import { useContext } from "react"

import { NotificationsContext } from "@/components/providers/NotificationsContext"

export const useNotificationsContext = () => {
	return useContext(NotificationsContext)
}
