export const VALUES = {
	MAX_PASSWORD_LENGTH: 24,
	MIN_PASSWORD_LENGTH: 8,
	MAX_ID_LENGTH: 15,
	MIN_ID_LENGTH: 3,
} as const;

export enum EnumErrorMsgCodes {
	EMAIL_IS_EXIST = "email_is_exist",
	USERNAME_IS_EXIST = "username_is_exist",
	ACCOUNT_NOT_FOUND = "account_not_found",
	INVALID_PASSWORD = "invalid_password",
	AUTH_TO_HAVE_ACCESS = "auth_to_have_access",
	SERVER_ERROR = "500",
}
