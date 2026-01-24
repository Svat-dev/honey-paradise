import IMask from "imask"

const defaultMask = "+7 (000) 000-00-00"

export function getMaskedPhone(
	phone: string | undefined,
	pattern: string = defaultMask
): string {
	if (!phone) return ""

	const mask = IMask.createMask({ mask: pattern })

	mask.resolve(phone)

	return mask.value
}
