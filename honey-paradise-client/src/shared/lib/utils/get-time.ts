export function getTimeString(date: number): string {
	const _minutes = Math.floor(date / 60000);
	const _hours = Math.floor(_minutes / 60);
	const _days = Math.floor(_hours / 24);

	const minutes = _minutes % 60;
	const hours = _hours % 24;
	const days = _days;

	return `${days > 0 ? `${getDaysString(days)}, ` : ""}${hours > 0 ? `${getHoursString(hours)}, ` : ""}${
		minutes === 0 ? "меньше минуты" : getMinutesString(minutes)
	}`;
}

export function getSecondsString(seconds: number): string {
	const secondStr =
		seconds % 10 === 1 && seconds % 100 !== 11
			? `${seconds} секунда`
			: seconds % 10 >= 2 && seconds % 10 <= 4 && (seconds % 100 < 10 || seconds % 100 >= 20)
			? `${seconds} секунды`
			: `${seconds} секунд`;

	return secondStr;
}

export function getMinutesString(minutes: number): string {
	const minutesStr =
		minutes % 10 === 1 && minutes % 100 !== 11
			? `${minutes} минута`
			: minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20)
			? `${minutes} минуты`
			: `${minutes} минут`;

	return minutesStr;
}

export function getHoursString(hours: number): string {
	const hoursStr =
		hours % 10 === 1 && hours % 100 !== 11
			? `${hours} час`
			: hours % 10 >= 2 && hours % 10 <= 4 && (hours % 100 < 10 || hours % 100 >= 20)
			? `${hours} часа`
			: `${hours} часов`;

	return hoursStr;
}

export function getDaysString(days: number): string {
	const daysStr =
		days % 10 === 1 && days % 100 !== 11
			? `${days} день`
			: days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)
			? `${days} дня`
			: `${days} дней`;

	return daysStr;
}
