export function checkPhoneNumber(phone: string): boolean {
	const phoneRegex = /^7\d{10}$/;
	return phoneRegex.test(phone);
}
