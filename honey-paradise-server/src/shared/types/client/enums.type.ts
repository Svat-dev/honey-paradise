export enum EnumStorageKeys {
	IS_AGREE_WITH_COOKIES = "is_agree_with_cookies",
	LOCALE_LANGUAGE = "locale_lang",
	CURRENT_EMAIL = "current_email",
	SOCKET_SESSION_TOKEN = "socket_session_token",
}

export enum EnumErrorCauses {
	EMAIL_TOKEN_EXPIRED = "has_expired",
	ACCOUNT_NOT_VERIFIED = "account_not_verified",
}

export enum EnumClientRoutes {
	INDEX = "/",
	AUTH = "/auth",

	SIGN_IN = `${AUTH}/sign-in`,
	CONFIRMATION = `${AUTH}/confirmation`,

	RESET_PASSWORD = `${AUTH}/password-recovery?type=reset`,
	CHANGE_PASSWORD = `${AUTH}/password-recovery?type=change`,

	ACCOUNT = "/account",

	SETTINGS = `${ACCOUNT}/settings`,
	DEVICES = `${SETTINGS}?active_tab=devices`,

	NOTIFICATIONS = `${ACCOUNT}/notifications`,

	CONNECTIONS = `${ACCOUNT}/connections`,
}
