import { VALUES } from "@constants/base";

export function validateUsername(input: string | undefined, type: "schema" | "unique-check" = "schema"): boolean {
	if (!input) return type === "schema" ? true : false;

	const regex = /^[a-zA-Zа-яА-Я0-9_]+$/;
	const regexRes = regex.test(input);

	return input.length >= VALUES.MIN_ID_LENGTH && input.length <= VALUES.MAX_ID_LENGTH && regexRes;
}
