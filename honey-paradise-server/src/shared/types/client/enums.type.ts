export enum EnumStorageKeys {
	LOCALE_LANGUAGE = "HONEY_PARADISE_LOCALE_LANGUAGE",
	CURRENT_EMAIL = "HONEY_PARADISE_CURRENT_EMAIL",
	SOCKET_SESSION_TOKEN = "HONEY_PARADISE_SOCKET_SESSION_TOKEN",
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
