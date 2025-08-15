import { notificationsService } from "@/services/notifications.service";
import { useMutation } from "@tanstack/react-query";

export const useMarkAsReadS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["mark notification as read"],
		mutationFn: (ids: string[]) => notificationsService.markAsRead(ids),
	});

	return {
		markAsReadAsync: mutateAsync,
		isMarkingAsRead: isPending,
	};
};

export const useMarkAsReadAllS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["mark notification as read all"],
		mutationFn: () => notificationsService.markAsReadAll(),
	});

	return {
		markAsReadAllAsync: mutateAsync,
		isAllMarkingAsRead: isPending,
	};
};

export const useMarkAsArchivedS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["mark notification as archived"],
		mutationFn: (ids: string[]) => notificationsService.markAsArchived(ids),
	});

	return {
		markAsArchivedAsync: mutateAsync,
		isMarkingAsArchived: isPending,
	};
};
