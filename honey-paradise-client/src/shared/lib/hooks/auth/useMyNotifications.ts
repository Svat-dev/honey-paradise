import { type RefetchOptions, useQuery, useQueryClient } from "@tanstack/react-query";

import { errorCatch } from "@/api/api-helper";
import { useMarkAsArchivedS, useMarkAsReadS, useNotificationsDeleteS } from "@/services/hooks/notifications";
import { notificationsService } from "@/services/notifications.service";
import type { INotificationsQueryParams } from "@/services/types/notifications-service.type";
import { NotificationsIdsDto } from "@/shared/types/server";
import type { AxiosError } from "axios";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { queryKeys } from "../../constants/routes";
import { useAuth } from "./useAuth";

export const useMyNotifications = (queryParams = {} as INotificationsQueryParams, enabled: boolean = true) => {
	const client = useQueryClient();
	const { isAuthenticated } = useAuth();

	const queryKey = queryKeys.getAllUserNotifications;

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

	return useMemo(
		() => ({ isNotificationsLoading, notifications, notificationsLength, refetchNotifications, unReadLength }),
		[isNotificationsLoading, notifications, notificationsLength, refetchNotifications, unReadLength]
	);
};

export const useManageNotifications = () => {
	const { markAsReadAsync, isMarkingAsRead } = useMarkAsReadS();
	const { markAsArchivedAsync, isMarkingAsArchived } = useMarkAsArchivedS();
	const { deleteNotificationsAsync, isDeleting } = useNotificationsDeleteS();

	const markAsRead = async (dto: NotificationsIdsDto, not_toast?: boolean) => {
		try {
			await markAsReadAsync(dto);

			if (!not_toast) toast.success("Уведомление прочитано");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			if (!not_toast) toast.error(errMsg);
		}
	};

	const markAsArchived = async (dto: NotificationsIdsDto) => {
		try {
			await markAsArchivedAsync(dto);

			toast.success("Уведомление помещено в архив");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			toast.error(errMsg);
		}
	};

	const deleteNotification = async (ids: string[]) => {
		try {
			await deleteNotificationsAsync(ids);

			toast.success("Уведомление удалено");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			toast.error(errMsg);
		}
	};

	return useMemo(
		() => ({
			isMarkingAsRead,
			isMarkingAsArchived,
			isDeleting,
			markAsRead,
			markAsArchived,
			deleteNotification,
		}),
		[markAsRead, markAsArchived, deleteNotification, isMarkingAsRead, isMarkingAsArchived, isDeleting]
	);
};
