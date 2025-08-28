import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notificationsService } from "@/services/notifications.service";
import type { INotificationsIdsDto } from "@/services/types/notifications-service.type";
import { queryKeys } from "@constants/routes";

export const useMarkAsReadS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getAllUserNotifications], type: "all" });

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.markNotificationAsRead],
		mutationFn: (dto: INotificationsIdsDto) => notificationsService.markAsRead(dto),
		onSuccess,
	});

	return {
		markAsReadAsync: mutateAsync,
		isMarkingAsRead: isPending,
	};
};

export const useMarkAsReadAllS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getAllUserNotifications], type: "all" });

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.markAllNotificationAsRead],
		mutationFn: () => notificationsService.markAsReadAll(),
		onSuccess,
	});

	return {
		markAsReadAllAsync: mutateAsync,
		isAllMarkingAsRead: isPending,
	};
};

export const useMarkAsArchivedS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getAllUserNotifications], type: "all" });

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.markNotificationAsArchived],
		mutationFn: (dto: INotificationsIdsDto) => notificationsService.markAsArchived(dto),
		onSuccess,
	});

	return {
		markAsArchivedAsync: mutateAsync,
		isMarkingAsArchived: isPending,
	};
};
