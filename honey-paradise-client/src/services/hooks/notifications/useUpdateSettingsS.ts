import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notificationsService } from "@/services/notifications.service";
import type { IUpdateNotificationsSettingsDto } from "@/services/types/notifications-service.type";
import { queryKeys } from "@/shared/lib/constants/routes";

export const useUpdateSettingsS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getMyAccount], type: "all" });

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.updateNotificationsSettings],
		mutationFn: (dto: IUpdateNotificationsSettingsDto) => notificationsService.updateSettings(dto),
		onSuccess,
	});

	return {
		updateSettingsAsync: mutateAsync,
		isSettingsUpdating: isPending,
	};
};
