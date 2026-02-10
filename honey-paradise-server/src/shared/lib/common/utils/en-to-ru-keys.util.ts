/**
 * Converts English keys to Russian keys.
 * @param str - The string to convert.
 * @returns The converted string.
 */
export function enToRuKeys(str: string): string {
	str = str.toLowerCase()

	const enToRuMap: Record<string, string> = {
		"`": "ё",
		q: "й",
		w: "ц",
		e: "у",
		r: "к",
		t: "е",
		y: "н",
		u: "г",
		i: "ш",
		o: "щ",
		p: "з",
		"[": "х",
		"]": "ъ",
		a: "ф",
		s: "ы",
		d: "в",
		f: "а",
		g: "п",
		h: "р",
		j: "о",
		k: "л",
		l: "д",
		";": "ж",
		"'": "э",
		z: "я",
		x: "ч",
		c: "с",
		v: "м",
		b: "и",
		n: "т",
		m: "ь",
		",": "б",
		".": "ю"
	}

	return str
		.split("")
		.map(char => enToRuMap[char] || char)
		.join("")
}
