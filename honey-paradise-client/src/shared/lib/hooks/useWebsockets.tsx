import { useEffect, useId } from "react";
import { EnumWSPaths, EnumWSRoutes } from "../constants/base";

import { NotificationsToaster } from "@/components/ui/components/NotificationsToaster";
import { useGetMyId } from "@/services/hooks/account";
import styles from "@styles/modules/toaster.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useWebsockets = (isAuthenticated: boolean | undefined) => {
	const { userId } = useGetMyId();

	const client = useQueryClient();
	const toastId = useId();

	useEffect(() => {
		if (isAuthenticated) {
			const notifications_socket = io(process.env.SERVER_URL, { withCredentials: true, path: EnumWSPaths.NOTIFICATIONS, auth: { userId } });

			notifications_socket.on(EnumWSRoutes.NEW_NOTIFICATION, msg => {
				toast(() => <NotificationsToaster nid={msg.nid} id={toastId} />, {
					position: "bottom-right",
					icon: "🔔",
					id: toastId,
					duration: Infinity,
					className: styles["notifications-toaster"],
				});

				if (msg.message === "notifications/refresh") client.invalidateQueries({ queryKey: ["get all notifications"] });
			});
		} else return;
	}, [userId]);
};
