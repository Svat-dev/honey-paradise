import { addHours, toDate } from "date-fns";
import { getDaysString, getHoursString, getMinutesString } from "./get-time";

export function getSessionTimeString(createdAtStr: string): string {
	const now = new Date().getTime();
	const createdAt = toDate(createdAtStr).getTime();
	const createAtISO = addHours(toDate(createdAtStr), 3).toISOString();

	const days = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

	if (days === 0) {
		const hours = Math.floor((now - createdAt) / (1000 * 60 * 60));
		if (hours === 0) {
			const minutes = Math.floor((now - createdAt) / (1000 * 60));

			if (minutes < 3) return "только что";

			const minutesStr = getMinutesString(minutes);
			return `${minutesStr} назад`;
		} else {
			const hoursStr = getHoursString(hours);
			return `${hoursStr} назад`;
		}
	} else if (days === 1) {
		const hours = createAtISO.split("T")[1].split(".")[0].split(":")[0];
		const minutes = createAtISO.split("T")[1].split(".")[0].split(":")[1];
		return hours === "00" && minutes === "00"
			? "вчера в полночь"
			: hours === "12" && minutes === "00"
			? "вчера в полдень"
			: `вчера в ${hours}:${minutes}`;
	} else {
		if (days < 7) {
			return `${getDaysString(days)} назад`;
		} else {
			return `более ${Math.floor(days / 7)} недель назад`;
		}
	}
}
