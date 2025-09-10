import { getNotificationHeadingByType } from "@/shared/lib/utils/get-notification-heading";
import { getTimeAsWordString } from "@/shared/lib/utils/time/get-time-as-word";
import { GetMyNotificationResponseType } from "@/shared/types/server";
import { useManageNotifications } from "@hooks/auth";
import { useNotificationsContext } from "@hooks/context";
import { useLanguage } from "@i18n/hooks";
import { useTranslations } from "next-intl";
import { type MouseEventHandler, useEffect, useMemo, useState } from "react";

export const useNotificationItem = (
	id: string | undefined,
	type: GetMyNotificationResponseType | undefined,
	isRead: boolean,
	createdAt: string | undefined
) => {
	const t = useTranslations("global.notifications.content.notification");
	const dt = useTranslations("shared.time");
	const { locale } = useLanguage();

	const { isSelectMode, addSelectedId, removeSelectedId, selectedIds } = useNotificationsContext();
	const { markAsRead } = useManageNotifications();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [time, setTime] = useState<string>(getTimeAsWordString(createdAt!));
	const [readTimeout, setReadTimeout] = useState<NodeJS.Timeout | null>(null);

	const title = getNotificationHeadingByType(type!);
	const isSelected = selectedIds.includes(id!);

	const onContextMenu: MouseEventHandler<HTMLElement> = e => {
		if (e.button === 2) {
			e.preventDefault();
			return setIsOpen(prev => !prev);
		} else return;
	};

	const onMouseEnter: MouseEventHandler<HTMLElement> = () => {
		if (isRead || !id || isSelectMode) return;
		const timeout = setTimeout(() => markAsRead({ ids: [id], single: true }, true), 2000);
		setReadTimeout(timeout);
	};

	const onMouseLeave: MouseEventHandler<HTMLElement> = () => {
		if (readTimeout) {
			clearTimeout(readTimeout);
			setReadTimeout(null);
		}
	};

	const onClick = () => {
		if (!isSelectMode) return;

		if (isSelected) return removeSelectedId(id!);
		else return addSelectedId(id!);
	};

	useEffect(() => {
		const interval = setInterval(() => setTime(getTimeAsWordString(createdAt!, dt)), 1000 * 60 * 3);
		return () => clearInterval(interval);
	}, []);

	return useMemo(
		() => ({
			onContextMenu,
			title,
			time,
			isOpen,
			setIsOpen,
			onClick,
			isSelected,
			isSelectMode,
			onMouseEnter,
			onMouseLeave,
			t,
		}),
		[time, isSelected, isOpen, isSelectMode, locale, onClick, onMouseEnter, onMouseLeave]
	);
};
