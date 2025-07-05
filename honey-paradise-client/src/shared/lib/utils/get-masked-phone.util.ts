import IMask from "imask";

export function getMaskedPhone(phone: string, pattern: string = "+7 (000) 000-00-00"): string {
	const mask = IMask.createMask({ mask: pattern });

	mask.resolve(phone);

	return mask.value;
}
