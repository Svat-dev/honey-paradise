export function verifyNanoid(id: any) {
	if (!(id instanceof String)) return false

	// We want to know what characters are being used...
	let legalCharacters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"

	// Not required. Just removes duplicate characters.
	let usedCharacters = new Set(id)

	// If there is an unknown character in the id, return false
	for (let character of usedCharacters)
		if (!legalCharacters.includes(character)) return false

	return true
}
