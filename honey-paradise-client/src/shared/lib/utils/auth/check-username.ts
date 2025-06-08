export function validateUsername(input: string | undefined): boolean {
	if (!input) return true;

	const regex = /^[a-zA-Zа-яА-Я0-9_]+$/;
	return regex.test(input);
}
