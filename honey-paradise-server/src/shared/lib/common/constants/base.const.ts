import { MAX } from "uuid";

export const VALUES = {
	MAX_PASSWORD_LENGTH: 24,
	MIN_PASSWORD_LENGTH: 8,
	MAX_ID_LENGTH: 20,
	MIN_ID_LENGTH: 3,
} as const;

export const TOKENS_LENGTH = {
	EMAIL_VERIFY: 6,
	PASSWORD_RECOVERY: MAX,
	TFA_VERIFY: 0,
} as const;

export const USERNAME_REGEX = /^[a-zA-Zа-яА-Я0-9_]+$/;

export const DEFAULT_AVATAR_PATH = "/avatars/default.webp";
