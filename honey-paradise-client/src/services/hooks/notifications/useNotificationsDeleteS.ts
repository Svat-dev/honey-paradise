import { notificationsService } from "@/services/notifications.service";
import { useMutation } from "@tanstack/react-query";

export const useNotificationsDeleteS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["delete notifications"],
		mutationFn: (ids: string[]) => notificationsService.delete(ids),
	});

	return {
		deleteNotificationsAsync: mutateAsync,
		isDeleting: isPending,
	};
};
