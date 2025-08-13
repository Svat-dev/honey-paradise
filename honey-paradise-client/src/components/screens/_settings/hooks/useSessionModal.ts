import { useId, useState } from "react";

import { getTimeAsWordString } from "@/shared/lib/utils/get-time-as-word";
import type { ISessionMetadata } from "@/shared/types/models/session.type";
import { useLanguage } from "@i18n/hooks";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import type { ISessionInfo } from "../types/session-modal.type";

export const useSessionModal = (metadata: ISessionMetadata, createdAt: string) => {
	const { locale } = useLanguage();
	const t = useTranslations("global.settings.content.devices");
	const dt = useTranslations("shared.time");

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [time, setTime] = useState<string>(getTimeAsWordString(createdAt));

	const center = [metadata.location.latidute, metadata.location.longitude];
	const lang = locale === "ru" ? "ru_RU" : "en_US";

	const data: ISessionInfo[] = [
		{
			id: useId(),
			text: t("modals.more.content.device"),
			value: `${metadata.device.browser}, ${metadata.device.os}`,
		},
		{
			id: useId(),
			text: t("modals.more.content.location"),
			value: `${metadata.location.country}, ${metadata.location.city}`,
		},
		{
			id: useId(),
			text: t("modals.more.content.ip"),
			value: metadata.ip,
		},
		{
			id: useId(),
			text: t("modals.more.content.time"),
			value: `${format(createdAt, "dd.MM.yyyy")}, (${time})`,
		},
	];

	setInterval(() => {
		setTime(getTimeAsWordString(createdAt, dt));
	}, 1000 * 60 * 3);

	return {
		isOpen,
		center,
		lang,
		data,
		setIsOpen,
		t,
	};
};
