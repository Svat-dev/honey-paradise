export function validatePassword(input: string): boolean {
	const regex = /^[a-zA-Zа-яА-Я0-9%&$#!.*^_-]+$/;
	return regex.test(input);
}
