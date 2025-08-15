import type { EnumNotificationType } from "@/shared/types/models";
import { getNotificationHeadingByType } from "@utils/get-notification-heading-by-type";
import { getTimeAsWordString } from "@utils/get-time-as-word";
import { useTranslations } from "next-intl";
import { type MouseEventHandler, useState } from "react";

export const useNotificationItem = (type: EnumNotificationType | undefined, createdAt: string | undefined) => {
	const dt = useTranslations("shared.time");

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [time, setTime] = useState<string>(getTimeAsWordString(createdAt!));

	const title = getNotificationHeadingByType(type!);

	const onContextMenu: MouseEventHandler<HTMLElement> = e => {
		if (e.button === 2) {
			e.preventDefault();
			return setIsOpen(prev => !prev);
		} else return;
	};

	setInterval(() => {
		setTime(getTimeAsWordString(createdAt!, dt));
	}, 1000 * 60 * 3);

	return {
		onContextMenu,
		title,
		time,
		isOpen,
		setIsOpen,
	};
};
