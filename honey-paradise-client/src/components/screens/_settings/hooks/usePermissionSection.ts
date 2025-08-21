import { useEffect, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import { useUpdateSettingsS } from "@/services/hooks/notifications";
import type { IUpdateNotificationsSettingsDto } from "@/services/types/notifications-service.type";
import type { TRefetchFunction } from "@/shared/types";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const usePermissionSection = (accRefetch: TRefetchFunction) => {
	const [permission, setPermission] = useState<NotificationPermission>("default");
	const { isSettingsUpdating, updateSettingsAsync } = useUpdateSettingsS();

	const onSwitchChange = async (value: boolean, field: keyof IUpdateNotificationsSettingsDto) => {
		try {
			await updateSettingsAsync({ [field]: value });

			accRefetch();
			toast.success("Настройки успешно обновлены!");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);

			toast.error(errMsg);
		}
	};

	const onRequestPermission = () =>
		Notification.requestPermission()
			.then(val => setPermission(val))
			.catch(() => console.error("Ошибка при запросе разрешения на уведомления"));

	useEffect(() => {
		if (Notification.permission) setPermission(Notification.permission);
	}, []);

	return {
		onSwitchChange,
		onRequestPermission,
		permission,
		isSettingsUpdating,
	};
};
