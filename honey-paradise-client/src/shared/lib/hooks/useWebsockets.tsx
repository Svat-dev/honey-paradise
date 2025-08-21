import { APP_NAME_EN, APP_NAME_RU, EnumWSPaths, EnumWSRoutes } from "@constants/base";
import { useEffect, useId } from "react";
import { useMyAccount, useSessions } from "./auth";

import { NotificationsToaster } from "@/components/ui/components/NotificationsToaster";
import { EnumAppRoute } from "@constants/routes";
import { useSound } from "@hooks/useSound";
import { useLanguage } from "@i18n/hooks";
import styles from "@styles/modules/toaster.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const useWebsockets = (isAuthenticated: boolean | undefined) => {
	const { push } = useRouter();
	const { user } = useMyAccount();
	const { currentSession } = useSessions();

	const { play } = useSound("/audio/notification-sound.mp3");
	const { locale } = useLanguage();
	const t = useTranslations();

	const client = useQueryClient();
	const toastId = useId();

	useEffect(() => {
		if (isAuthenticated) {
			const notifications_socket = io(process.env.SERVER_URL, {
				withCredentials: true,
				path: EnumWSPaths.NOTIFICATIONS,
				auth: { userId: user?.id, sid: currentSession?.id },
			});

			notifications_socket.on(EnumWSRoutes.NEW_NOTIFICATION, async msg => {
				if (!user?.notificationSettings.enabled) return notifications_socket.disconnect();
				if (user?.notificationSettings.withSound) await play();

				toast(() => <NotificationsToaster nid={msg.nid} id={toastId} />, {
					position: "bottom-right",
					icon: "🔔",
					id: toastId,
					duration: Infinity,
					className: styles["notifications-toaster"],
				});

				if (Notification.permission === "granted") {
					new Notification(locale === "ru" ? APP_NAME_RU : APP_NAME_EN, {
						body: t("shared.notifications.desktop"),
						lang: locale,
						icon: "/public/icons/favicon.ico",
						silent: !!user?.notificationSettings.withSound,
					});
				} else if (Notification.permission !== "denied") await Notification.requestPermission();

				if (msg.message === "notifications/refresh") client.invalidateQueries({ queryKey: ["get all notifications"] });
			});

			notifications_socket.on(EnumWSRoutes.REFRESH_NOTIFICATIONS, msg => {
				if (msg.message === "notifications/refresh") client.invalidateQueries({ queryKey: ["get all notifications"] });
			});

			notifications_socket.on(EnumWSRoutes.REMOVE_SESSION, () => {
				client.invalidateQueries({ queryKey: ["get my account"] });

				push(EnumAppRoute.INDEX);

				return toast.error(t("toasters.notifications.sessionDeleted"));
			});
		} else return;
	}, [user?.id, user?.notificationSettings.enabled, user?.notificationSettings.withSound]);
};
