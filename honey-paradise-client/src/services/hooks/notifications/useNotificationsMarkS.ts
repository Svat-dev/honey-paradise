import { notificationsService } from "@/services/notifications.service";
import { useMutation } from "@tanstack/react-query";

export const useMarkAsReadS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["mark notification as read"],
		mutationFn: (id: string[]) => notificationsService.markAsRead(id),
	});

	return {
		markAsReadAsync: mutateAsync,
		isMarkingAsRead: isPending,
	};
};
