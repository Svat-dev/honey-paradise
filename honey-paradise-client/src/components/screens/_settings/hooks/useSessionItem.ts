import { useEffect, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import { getBrowserIcon } from "@/shared/lib/utils/session/get-browser-icon";
import { getTimeAsWordString } from "@/shared/lib/utils/time/get-time-as-word";
import type { ISessionMetadata } from "@/shared/types/models/session.type";
import type { AxiosError } from "axios";
import { HelpCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";

export const useSessionItem = (metadata: ISessionMetadata, remove: () => Promise<void>, isCurrent: boolean, createdAt: string) => {
	const t = useTranslations("global.settings.content.devices");
	const dt = useTranslations("shared.time");
	const [time, setTime] = useState<string>(getTimeAsWordString(createdAt));

	const {
		device: { browser, os },
		location: { city, country },
	} = metadata;

	const Icon = browser ? getBrowserIcon(browser) : HelpCircleIcon;

	const handleRemove = async () => {
		if (!isCurrent) {
			try {
				await remove();
			} catch (error) {
				const { errMsg } = errorCatch(error as AxiosError);
				const msg = t("toasters.serverError", { e: errMsg });

				toast.error(msg);
			}
		} else toast.error(t("toasters.clientError"));
	};

	useEffect(() => {
		setInterval(() => {
			setTime(getTimeAsWordString(createdAt, dt));
		}, 1000 * 60 * 3);
	}, []);

	return {
		Icon,
		browser,
		os,
		city,
		country,
		handleRemove,
		time,
		t,
	};
};
