import { useEffect, useMemo, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import { useUpdateSettingsS } from "@/services/hooks/notifications";
import type { IUpdateNotificationsSettingsDto } from "@/services/types/notifications-service.type";
import type { TRefetchFunction } from "@/shared/types";
import { EnumAppRoute } from "@constants/routes";
import { useLanguage } from "@i18n/hooks";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import slugify from "slugify";

export const useNotificationsSettings = (accRefetch: TRefetchFunction) => {
	const t = useTranslations("global.settings.content.notifications.content");
	const tgt = useTranslations("global.settings.content.profile.telegram-linking");

	const { locale } = useLanguage();
	const { isSettingsUpdating, updateSettingsAsync } = useUpdateSettingsS();

	const onSwitchChange = async (value: boolean, field: keyof IUpdateNotificationsSettingsDto) => {
		try {
			await updateSettingsAsync({ [field]: value });

			accRefetch();
			toast.success(t("toasters.success"));
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);

			toast.error(errMsg);
		}
	};

	const getTitles = () => {
		const enabled_server = t("permissions.enabled.title").split(" ");
		const sound_server = t("permissions.sound.title").split(" ");
		const site_server = t("destination.site.title").split(" ");
		const tg_server = t("destination.tg.title").split(" ");

		enabled_server.shift();
		sound_server.shift();
		site_server.shift();
		tg_server.shift();

		return {
			enabled: " " + enabled_server.join(" "),
			sound: " " + sound_server.join(" "),
			site: " " + site_server.join(" "),
			tg: " " + tg_server.join(" "),
		};
	};

	const tgLinkRoute = `${EnumAppRoute.SETTINGS}?active_tab=profile#${slugify(tgt("title"), { locale: "en", lower: true })}`;

	return useMemo(
		() => ({
			onSwitchChange,
			isSettingsUpdating,
			getTitles,
			tgLinkRoute,
			t,
		}),
		[isSettingsUpdating, locale, onSwitchChange]
	);
};

export const usePermissionSection = () => {
	const [permission, setPermission] = useState<NotificationPermission>("default");

	const onRequestPermission = () =>
		Notification.requestPermission()
			.then(val => setPermission(val))
			.catch(() => console.error("Error requesting permission to send notifications"));

	useEffect(() => {
		if (Notification.permission) setPermission(Notification.permission);
	}, []);

	return {
		onRequestPermission,
		permission,
	};
};
