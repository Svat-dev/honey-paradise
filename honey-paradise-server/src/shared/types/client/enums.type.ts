export enum EnumStorageKeys {
	LOCALE_LANGUAGE = "HONEY_PARADISE_LOCALE_LANGUAGE",
	CURRENT_EMAIL = "HONEY_PARADISE_CURRENT_EMAIL",
}

export enum EnumErrorCauses {
	EMAIL_TOKEN_EXPIRED = "has_expired",
	ACCOUNT_NOT_VERIFIED = "account_not_verified",
}

export enum EnumClientRoutes {
	INDEX = "/",
	AUTH = "/auth",

	CONFIRMATION = `${AUTH}/confirmation`,

	RESET_PASSWORD = `${AUTH}/password-recovery?type=reset`,
	CHANGE_PASSWORD = `${AUTH}/password-recovery?type=change`,

	ACCOUNT = "/account",
	SETTINGS = `${ACCOUNT}/settings`,
	DEVICES = `${SETTINGS}?active_tab=devices`,
}
