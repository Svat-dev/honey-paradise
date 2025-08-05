export function checkEmail(email: string | undefined, type: "schema" | "unique-check" = "schema"): boolean {
	if (!email) return type === "schema" ? true : false;

	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z0-9]{2,}(?:\.[a-zA-Z0-9]{2,})*$/;

	return emailRegex.test(email);
}
