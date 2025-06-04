export function validateUsername(input: string): boolean {
	const regex = /^[a-zA-Zа-яА-Я0-9_]+$/;
	return regex.test(input);
}
