export function getMinutesString(minutes: number, t: any): string {
	const minutesStr =
		t("content.time.minute.default", { minutes }) !== "ru"
			? t("content.time.minute.default", { minutes })
			: minutes % 10 === 1 && minutes % 100 !== 11
			? t("content.time.minute.1", { minutes })
			: minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20)
			? t("content.time.minute.2-4", { minutes })
			: t("content.time.minute.other", { minutes });

	return minutesStr;
}

export function getHoursString(hours: number, t: any): string {
	const hoursStr =
		t("content.time.hour.default", { hours }) !== "ru"
			? t("content.time.hour.default", { hours })
			: hours % 10 === 1 && hours % 100 !== 11
			? t("content.time.hour.1", { hours })
			: hours % 10 >= 2 && hours % 10 <= 4 && (hours % 100 < 10 || hours % 100 >= 20)
			? t("content.time.hour.2-4", { hours })
			: t("content.time.hour.other", { hours });

	return hoursStr;
}

export function getDaysString(days: number, t: any): string {
	const daysStr =
		t("content.time.day.default", { days }) !== "ru"
			? t("content.time.day.default", { days })
			: days % 10 === 1 && days % 100 !== 11
			? t("content.time.day.1", { days })
			: days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)
			? t("content.time.day.2-4", { days })
			: t("content.time.day.other", { days });

	return daysStr;
}
