export function getMinutesString(minutes: number, t: any): string {
	const minutesStr =
		t("minute.default", { minutes }) !== "ru"
			? t("minute.default", { minutes })
			: minutes % 10 === 1 && minutes % 100 !== 11
			? t("minute.1", { minutes })
			: minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20)
			? t("minute.2-4", { minutes })
			: t("minute.other", { minutes });

	return minutesStr;
}

export function getHoursString(hours: number, t: any): string {
	const hoursStr =
		t("hour.default", { hours }) !== "ru"
			? t("hour.default", { hours })
			: hours % 10 === 1 && hours % 100 !== 11
			? t("hour.1", { hours })
			: hours % 10 >= 2 && hours % 10 <= 4 && (hours % 100 < 10 || hours % 100 >= 20)
			? t("hour.2-4", { hours })
			: t("hour.other", { hours });

	return hoursStr;
}

export function getDaysString(days: number, t: any): string {
	const daysStr =
		t("day.default", { days }) !== "ru"
			? t("day.default", { days })
			: days % 10 === 1 && days % 100 !== 11
			? t("day.1", { days })
			: days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)
			? t("day.2-4", { days })
			: t("day.other", { days });

	return daysStr;
}

export function getMonthsString(months: number, t: any): string {
	const monthsStr =
		t("month.default", { months }) !== "ru"
			? t("month.default", { months })
			: months % 10 === 1 && months % 100 !== 11
			? t("month.1", { months })
			: months % 10 >= 2 && months % 10 <= 4 && (months % 100 < 10 || months % 100 >= 20)
			? t("month.2-4", { months })
			: t("month.other", { months });

	return monthsStr;
}
