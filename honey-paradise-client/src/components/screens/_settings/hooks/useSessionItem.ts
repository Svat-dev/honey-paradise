import { errorCatch } from "@/api/api-helper";
import type { ISessionMetadata } from "@/shared/types/models/session.type";
import { getBrowserIcon } from "@utils/get-browser-icon";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const useSessionItem = (metadata: ISessionMetadata, remove: () => Promise<void>, isCurrent: boolean) => {
	const t = useTranslations("global.settings.content.devices");

	const {
		device: { browser, os },
		location: { city, country },
	} = metadata;

	const Icon = getBrowserIcon(browser);

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

	return {
		Icon,
		browser,
		os,
		city,
		country,
		handleRemove,
		t,
	};
};
