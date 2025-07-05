export const VALUES = {
	MAX_PASSWORD_LENGTH: 24,
	MIN_PASSWORD_LENGTH: 8,
	MAX_ID_LENGTH: 15,
	MIN_ID_LENGTH: 3,
	MIN_PHONE_LENGTH: 18,
} as const;

export const errorCauses = {
	ACCOUNT_NOT_VERIFIED: "account_not_verified",
	VERIFICATION_TOKEN_EXPIRED: "has_expired",
} as const;
