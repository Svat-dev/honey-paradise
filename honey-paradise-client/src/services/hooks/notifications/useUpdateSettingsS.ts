import { notificationsService } from "@/services/notifications.service";
import type { IUpdateNotificationsSettingsDto } from "@/services/types/notifications-service.type";
import { useMutation } from "@tanstack/react-query";

export const useUpdateSettingsS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["update notifications settings"],
		mutationFn: (dto: IUpdateNotificationsSettingsDto) => notificationsService.updateSettings(dto),
	});

	return {
		updateSettingsAsync: mutateAsync,
		isSettingsUpdating: isPending,
	};
};
