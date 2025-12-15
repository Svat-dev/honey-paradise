/**
 * Делает первую букву в слове заглавной
 * @param {string} name Слово которое надо "капитализировать"
 * @param {boolean} otherLow - оставить все буквы маленькими
 * @returns Слово с первой заглавной буквой
 */
export function capitalize(name: string, otherLow: boolean = false): string {
	name = otherLow ? name.toLowerCase() : name;

	const splitted = name.split("");
	const first = splitted[0].toUpperCase();

	const result = [first, ...splitted.splice(1, splitted.length - 1)].join("");

	return result;
}
