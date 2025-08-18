import { useManageNotifications } from "@/shared/lib/hooks/auth";
import type { EnumNotificationType } from "@/shared/types/models";
import { useNotificationsContext } from "@hooks/context";
import { getNotificationHeadingByType } from "@utils/get-notification-heading-by-type";
import { getTimeAsWordString } from "@utils/get-time-as-word";
import { useLocale, useTranslations } from "next-intl";
import { type MouseEventHandler, useMemo, useState } from "react";

export const useNotificationItem = (
	id: string | undefined,
	type: EnumNotificationType | undefined,
	isRead: boolean,
	createdAt: string | undefined
) => {
	const t = useTranslations("global.notifications.content.notification");
	const dt = useTranslations("shared.time");
	const locale = useLocale();

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
		if (isRead || !id) return;
		const timeout = setTimeout(() => markAsRead([id], true), 2000);
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

	setInterval(() => {
		setTime(getTimeAsWordString(createdAt!, dt));
	}, 1000 * 60 * 3);

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
