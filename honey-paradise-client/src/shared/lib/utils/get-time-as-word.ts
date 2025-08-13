import { addHours, toDate } from "date-fns";
import { getDaysString, getHoursString, getMinutesString } from "./get-time";

import { useTranslations } from "next-intl";

export function getTimeAsWordString(createdAtStr: string, dt?: any): string {
	const now = new Date().getTime();
	const createdAt = toDate(createdAtStr).getTime();
	const createAtISO = addHours(toDate(createdAtStr), 3).toISOString();

	const t = dt || useTranslations("shared.time");

	const days = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

	if (days === 0) {
		const hours = Math.floor((now - createdAt) / (1000 * 60 * 60));
		if (hours === 0) {
			const minutes = Math.floor((now - createdAt) / (1000 * 60));

			if (minutes < 3) return t("now");

			return getMinutesString(minutes, t);
		} else return getHoursString(hours, t);
	} else if (days === 1) {
		const hours = createAtISO.split("T")[1].split(".")[0].split(":")[0];
		const minutes = createAtISO.split("T")[1].split(".")[0].split(":")[1];

		return hours === "00" && minutes === "00"
			? t("yesterday.midnight")
			: hours === "12" && minutes === "00"
			? t("yesterday.midday")
			: t("yesterday.withDate", { time: `${hours}:${minutes}` });
	} else {
		if (days < 7) return getDaysString(days, t);
		else return t("week", { weeks: Math.floor(days / 7) });
	}
}
