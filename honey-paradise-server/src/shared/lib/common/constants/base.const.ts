export const VALUES = {
	MAX_PASSWORD_LENGTH: 24,
	MIN_PASSWORD_LENGTH: 8,
	MAX_ID_LENGTH: 15,
	MIN_ID_LENGTH: 3,
} as const;

export const USERNAME_REGEX = /^[a-zA-Zа-яА-Я0-9_]+$/;
