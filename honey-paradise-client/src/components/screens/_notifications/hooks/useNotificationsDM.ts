import { useMarkAsArchivedS, useMarkAsReadS, useNotificationsDeleteS } from "@/services/hooks/notifications";
import { FolderDownIcon, SquareCheckBigIcon, SquareMousePointerIcon, Trash2Icon } from "lucide-react";
import { useEffect, useMemo } from "react";

import { errorCatch } from "@/api/api-helper";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import type { INotificationDMData } from "../types/dropdown-menu.type";

export const useNotificationsDM = (nid: string, isRead: boolean, isOpen: boolean) => {
	const { markAsReadAsync } = useMarkAsReadS();
	const { markAsArchivedAsync } = useMarkAsArchivedS();
	const { deleteNotificationsAsync } = useNotificationsDeleteS();

	const onMarkAsRead = async () => {
		try {
			await markAsReadAsync([nid]);

			toast.success("Уведомление прочитано");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			toast.error(errMsg);
		}
	};

	const onMarkAsArchived = async () => {
		try {
			await markAsArchivedAsync([nid]);

			toast.success("Уведомление помещено в архив");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			toast.error(errMsg);
		}
	};

	const onDelete = async () => {
		try {
			await deleteNotificationsAsync([nid]);

			toast.success("Уведомление удалено");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			toast.error(errMsg);
		}
	};

	const data: INotificationDMData[] = useMemo(
		() => [
			{
				Icon: SquareCheckBigIcon,
				text: "Прочитать",
				shortcut: "Shift + R",
				onClick: onMarkAsRead,
				disabled: isRead,
			},
			{
				Icon: SquareMousePointerIcon,
				text: "Выбрать",
				shortcut: "Shift + C", // TODO Начать делать select mode
			},
			{
				Icon: FolderDownIcon,
				text: "Архивировать",
				shortcut: "Shift + A",
				onClick: onMarkAsArchived,
			},
			{
				Icon: Trash2Icon,
				text: "Удалить",
				shortcut: "Shift + D",
				onClick: onDelete,
				delete: true,
			},
		],
		[isRead]
	);

	const onKeydown = async (e: KeyboardEvent) => {
		if (!isOpen) return;

		if (e.shiftKey && e.key === "R") {
			e.preventDefault();
			await onMarkAsRead();
		}

		if (e.shiftKey && e.key === "C") {
			e.preventDefault();
			console.info(`Selected ${nid} notification`);
		}

		if (e.shiftKey && e.key === "A") {
			e.preventDefault();
			await onMarkAsArchived();
		}

		if (e.shiftKey && e.key === "D") {
			e.preventDefault();
			await onDelete();
		}
	};

	useEffect(() => {
		if (isOpen) {
			window.addEventListener("keydown", onKeydown);
			return () => window.removeEventListener("keydown", onKeydown);
		}

		return;
	}, [isOpen, onKeydown]);

	return {
		data,
	};
};
