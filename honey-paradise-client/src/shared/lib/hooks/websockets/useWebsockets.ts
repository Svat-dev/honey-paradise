import { EnumWSPaths, EnumWSRoutes } from "@constants/base";
import { EnumAppRoute, queryKeys } from "@constants/routes";
import { useMyAccount, useSessions } from "../auth";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { io, type Socket } from "socket.io-client";
import { useWSNewNotification } from "./callbacks/useWSNewNotification";

export const useNotificationWebsockets = (isAuthenticated: boolean | undefined) => {
	const { push } = useRouter();
	const { user, isAccSuccess } = useMyAccount();
	const { currentSession, isSessionSuccess } = useSessions();

	const t = useTranslations();
	const client = useQueryClient();
	const [socket, setSocket] = useState<Socket | null>(null);

	const { callback: newNotificationCb } = useWSNewNotification();

	useEffect(() => {
		if (isAuthenticated && !socket && isAccSuccess && isSessionSuccess) {
			const notifications_socket = io(process.env.SERVER_URL, {
				withCredentials: true,
				path: EnumWSPaths.NOTIFICATIONS,
				auth: { userId: user?.id, sid: currentSession?.id },
			});

			setSocket(notifications_socket);
		}

		if (!isAuthenticated && socket) socket.disconnect();
	}, [isAuthenticated, isAccSuccess, isSessionSuccess]);

	useEffect(() => {
		if (isAuthenticated) {
			socket?.on(EnumWSRoutes.NEW_NOTIFICATION, msg => newNotificationCb(msg, socket, user?.notificationSettings));

			socket?.on(EnumWSRoutes.REMOVE_SESSION, () => {
				client.invalidateQueries({ queryKey: [queryKeys.getMyAccount] });

				push(EnumAppRoute.INDEX);

				return toast.error(t("toasters.notifications.sessionDeleted"));
			});

			return () => {
				socket?.disconnect();
			};
		} else return;
	}, [user?.notificationSettings.enabled, user?.notificationSettings.withSound, socket]);
};
