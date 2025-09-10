import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateNotificationsSettingsDto } from "@/shared/types/server";
import { notificationsService } from "@/services/notifications.service";
import { queryKeys } from "@/shared/lib/constants/routes";

export const useUpdateSettingsS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getMyAccount], type: "all" });

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.updateNotificationsSettings],
		mutationFn: (dto: UpdateNotificationsSettingsDto) => notificationsService.updateSettings(dto),
		onSuccess,
	});

	return {
		updateSettingsAsync: mutateAsync,
		isSettingsUpdating: isPending,
	};
};
