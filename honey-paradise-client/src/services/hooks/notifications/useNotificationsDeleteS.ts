import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notificationsService } from "@/services/notifications.service";
import { queryKeys } from "@/shared/lib/constants/routes";

export const useNotificationsDeleteS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getAllUserNotifications], type: "all" });

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.deleteNotifications],
		mutationFn: (ids: string[]) => notificationsService.delete(ids),
		onSuccess,
	});

	return {
		deleteNotificationsAsync: mutateAsync,
		isDeleting: isPending,
	};
};
