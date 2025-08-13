import { type RefetchOptions, useQuery, useQueryClient } from "@tanstack/react-query";

import { notificationsService } from "@/services/notifications.service";
import type { INotificationsQueryParams } from "@/services/types/notifications-service.type";
import { useAuth } from "./useAuth";

export const useMyNotifications = (queryParams = {} as INotificationsQueryParams, enabled: boolean = true) => {
	const client = useQueryClient();
	const { isAuthenticated } = useAuth();

	const queryKey = "get all notifications";

	const { data, isLoading, isPending, refetch } = useQuery({
		queryKey: [queryKey, queryParams],
		queryFn: () => notificationsService.getAll(queryParams),
		enabled: isAuthenticated && enabled,
	});

	const _refetch = (opts?: RefetchOptions) => {
		client.invalidateQueries({ queryKey: [queryKey], type: "all" });
		refetch(opts);
	};

	const isNotificationsLoading = isLoading || isPending;
	const notifications = data?.data.notifications;
	const refetchNotifications = _refetch;
	const notificationsLength = data?.data.length;
	const unReadLength = data?.data.unReadLength;

	// return useMemo(
	// 	() => ({
	// 		isNotificationsLoading,
	// 		notifications,
	// 		refetchNotifications,
	// 	}),
	// 	[isNotificationsLoading, notifications, refetchNotifications]
	// );
	return {
		isNotificationsLoading,
		notifications,
		notificationsLength,
		refetchNotifications,
		unReadLength,
	};
};
