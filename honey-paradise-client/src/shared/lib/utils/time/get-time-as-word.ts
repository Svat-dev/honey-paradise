import { addHours, toDate } from "date-fns"
import { useTranslations } from "next-intl"

/**
 * Генерирует строку времени в разговорном формате
 * @param {string} startTime - время отсчета в формате ISO
 * @param {any} dt - Не обязательный параметр, если не передан, будет использоваться локализация по умолчанию
 * @returns {string} Строка времени в формате "сегодня в 12:00", 2 дня назад, 1 minute ago...
 */
export function getTimeAsWordString(startTime: string, dt?: any): string {
	const now = new Date().getTime()
	const createdAt = toDate(startTime).getTime()
	const createAtISO = addHours(toDate(startTime), 3).toISOString()

	const t = dt || useTranslations("shared.time")

	const days = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24))

	if (days === 0) {
		const hours = Math.floor((now - createdAt) / (1000 * 60 * 60))
		if (hours === 0) {
			const minutes = Math.floor((now - createdAt) / (1000 * 60))

			return minutes < 3 ? t("now") : t("minute", { minutes })
		} else return t("hour", { hours })
	} else if (days === 1) {
		const hours = createAtISO.split("T")[1].split(".")[0].split(":")[0]
		const minutes = createAtISO.split("T")[1].split(".")[0].split(":")[1]

		return hours === "00" && minutes === "00"
			? t("yesterday.midnight")
			: hours === "12" && minutes === "00"
				? t("yesterday.midday")
				: t("yesterday.withDate", { time: `${hours}:${minutes}` })
	} else {
		if (days < 7) return t("day", { days })
		else if (days < 30) return t("week", { weeks: Math.floor(days / 7) })
		else return t("month", { months: Math.floor(days / 30) })
	}
}
