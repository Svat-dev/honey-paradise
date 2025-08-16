import { FolderDownIcon, SquareCheckBigIcon, SquareMousePointerIcon, Trash2Icon, XCircleIcon } from "lucide-react";
import { useEffect, useMemo } from "react";

import { useManageNotifications } from "@hooks/auth";
import { useNotificationsContext } from "@hooks/context";
import type { INotificationDMData } from "../types/dropdown-menu.type";

export const useNotificationsDM = (nid: string, isRead: boolean, isOpen: boolean) => {
	const { isSelectMode, selectedIds, setSelectMode, removeSelectedId } = useNotificationsContext();

	const { deleteNotification, markAsArchived, markAsRead } = useManageNotifications();

	const isSelected = selectedIds.includes(nid);

	const onMarkAsRead = async () => {
		if (isRead) return;

		await markAsRead([nid]);
	};

	const onClickSelect = () => {
		if (isSelected) removeSelectedId(nid);
		else setSelectMode(nid);
	};

	const data: INotificationDMData[] = useMemo(
		() => [
			{
				Icon: SquareCheckBigIcon,
				text: "Прочитать",
				shortcut: "Shift + R",
				onClick: onMarkAsRead,
				disabled: isRead || isSelectMode,
			},
			{
				Icon: isSelected ? XCircleIcon : SquareMousePointerIcon,
				text: isSelected ? "Не выбирать" : "Выбрать",
				shortcut: "Shift + C",
				onClick: onClickSelect,
			},
			{
				Icon: FolderDownIcon,
				text: "Архивировать",
				shortcut: "Shift + A",
				onClick: () => markAsArchived([nid]),
				disabled: isSelectMode,
			},
			{
				Icon: Trash2Icon,
				text: "Удалить",
				shortcut: "Shift + D",
				onClick: () => deleteNotification([nid]),
				disabled: isSelectMode,
				delete: true,
			},
		],
		[isRead, isSelected, isSelectMode]
	);

	const onKeydown = async (e: KeyboardEvent) => {
		if (!isOpen) return;

		if (!isSelectMode && e.shiftKey && e.key === "R") {
			e.preventDefault();
			await onMarkAsRead();
		}

		if (e.shiftKey && e.key === "C") {
			e.preventDefault();
			onClickSelect();
		}

		if (!isSelectMode && e.shiftKey && e.key === "A") {
			e.preventDefault();
			await markAsArchived([nid]);
		}

		if (!isSelectMode && e.shiftKey && e.key === "D") {
			e.preventDefault();
			await deleteNotification([nid]);
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
