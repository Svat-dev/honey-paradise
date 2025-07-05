import IMask from "imask";

export function getMaskedPhone(phone: string | undefined, pattern: string = "+7 (000) 000-00-00"): string {
	if (!phone) return "";

	const mask = IMask.createMask({ mask: pattern });

	mask.resolve(phone);

	return mask.value;
}
