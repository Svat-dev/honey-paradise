import { NotificationsContext } from "@/components/providers/NotificationsContext";
import { useContext } from "react";

export const useNotificationsContext = () => {
	return useContext(NotificationsContext);
};
