import { addHours, toDate } from "date-fns";
import { getDaysString, getHoursString, getMinutesString } from "./get-time";

import { useTranslations } from "next-intl";

export function getSessionTimeString(createdAtStr: string): string {
	const now = new Date().getTime();
	const createdAt = toDate(createdAtStr).getTime();
	const createAtISO = addHours(toDate(createdAtStr), 3).toISOString();

	const t = useTranslations("global.settings.content.devices");

	const days = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

	if (days === 0) {
		const hours = Math.floor((now - createdAt) / (1000 * 60 * 60));
		if (hours === 0) {
			const minutes = Math.floor((now - createdAt) / (1000 * 60));

			if (minutes < 3) return t("content.time.now");

			return getMinutesString(minutes, t);
		} else return getHoursString(hours, t);
	} else if (days === 1) {
		const hours = createAtISO.split("T")[1].split(".")[0].split(":")[0];
		const minutes = createAtISO.split("T")[1].split(".")[0].split(":")[1];

		return hours === "00" && minutes === "00"
			? t("content.time.yesterday.midnight")
			: hours === "12" && minutes === "00"
			? t("content.time.yesterday.midday")
			: t("content.time.yesterday.withDate", { time: `${hours}:${minutes}` });
	} else {
		if (days < 7) return getDaysString(days, t);
		else return t("content.time.week", { weeks: Math.floor(days / 7) });
	}
}
