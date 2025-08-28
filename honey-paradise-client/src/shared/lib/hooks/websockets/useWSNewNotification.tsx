import { APP_NAME_EN, APP_NAME_RU } from "@constants/base";

import type { INotificationSettings } from "@/shared/types/models";
import { NotificationsToaster } from "@/components/ui/components/NotificationsToaster";
import type { Socket } from "socket.io-client";
import { queryKeys } from "@constants/routes";
import styles from "@styles/modules/toaster.module.scss";
import toast from "react-hot-toast";
import { useLanguage } from "../../i18n/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useSound } from "../useSound";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useWSNewNotification = () => {
	const client = useQueryClient();

	const { play } = useSound("/audio/notification-sound.mp3");
	const { locale } = useLanguage();
	const t = useTranslations();

	const toastId = crypto.randomUUID();

	const callback = async (server_msg: any, socket: Socket | undefined, settings: INotificationSettings | undefined) => {
		if (!socket) return;
		if (!settings?.enabled) return socket.disconnect();

		const validateMessage = z.object({ nid: z.string(), message: z.string() });
		const result = validateMessage.safeParse(server_msg);

		if (!result.success) return;

		const msg = result.data;

		if (settings?.withSound) await play();

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
				silent: settings?.withSound ? false : true,
			});
		} else if (Notification.permission !== "denied") await Notification.requestPermission();

		if (msg.message === "notifications/refresh") client.invalidateQueries({ queryKey: [queryKeys.getAllUserNotifications] });
	};

	return {
		callback,
	};
};
