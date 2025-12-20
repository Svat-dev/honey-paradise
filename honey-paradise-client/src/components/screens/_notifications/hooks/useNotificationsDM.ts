import { FolderDownIcon, SquareCheckBigIcon, SquareMousePointerIcon, Trash2Icon, XCircleIcon } from "lucide-react";
import { useEffect, useMemo } from "react";

import { useManageNotifications } from "@hooks/auth";
import { useNotificationsContext } from "@hooks/context";
import { useLanguage } from "@i18n/hooks";
import { useTranslations } from "next-intl";
import type { INotificationDMData } from "../types/dropdown-menu.type";

export const useNotificationsDM = (nid: string, isRead: boolean, isOpen: boolean) => {
	const t = useTranslations("global.notifications.content.notification.dropdown");
	const { locale } = useLanguage(false);

	const { isSelectMode, selectedIds, setSelectMode, removeSelectedId } = useNotificationsContext();

	const { deleteNotification, markAsArchived, markAsRead } = useManageNotifications();

	const isSelected = selectedIds.includes(nid);

	const onMarkAsRead = async () => {
		if (isRead) return;

		await markAsRead({ ids: [nid], single: true });
	};

	const onClickSelect = () => {
		if (isSelected) removeSelectedId(nid);
		else setSelectMode(nid);
	};

	const data: INotificationDMData[] = useMemo(
		() => [
			{
				Icon: SquareCheckBigIcon,
				text: t("read"),
				shortcut: "Shift + R",
				onClick: onMarkAsRead,
				disabled: isRead || isSelectMode,
			},
			{
				Icon: isSelected ? XCircleIcon : SquareMousePointerIcon,
				text: t("select", { isSelected: String(isSelected) }),
				shortcut: "Shift + C",
				onClick: onClickSelect,
			},
			{
				Icon: FolderDownIcon,
				text: t("archive"),
				shortcut: "Shift + A",
				onClick: () => markAsArchived({ ids: [nid], single: true }),
				disabled: isSelectMode || !isRead,
			},
			{
				Icon: Trash2Icon,
				text: t("delete"),
				shortcut: "Shift + D",
				onClick: () => deleteNotification([nid]),
				disabled: isSelectMode,
				delete: true,
			},
		],
		[isRead, isSelected, isSelectMode, locale]
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

		if (!isSelectMode && isRead && e.shiftKey && e.key === "A") {
			e.preventDefault();
			await markAsArchived({ ids: [nid], single: true });
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
		t,
	};
};
