export enum EnumApiRoute {
	AUTH = "/auth",
	SIGN_IN = `${AUTH}/sign-in`,
	LOGOUT = `${AUTH}/logout`,

	TFA = `${AUTH}/tfa`,
	VERIFY_TFA = `${TFA}/verify`,
	SEND_TFA_CODE = `${TFA}/send-code`,

	SESSION = `${AUTH}/session`,
	CLEAR_SESSION = `${SESSION}/clear`,
	CURRENT_SESSION = `${SESSION}/current`,
	REMOVE_SESSION = `${SESSION}/remove`,
	GET_SESSION_BY_USER = `${SESSION}/by-user`,

	ACCOUNT = `${AUTH}/account`,
	MY_ACCOUNT = `${ACCOUNT}/me`,
	CREATE_ACCOUNT = `${ACCOUNT}/create`,

	PASSWORD = `${ACCOUNT}/password`,
	RESET_PASSWORD = `${PASSWORD}/reset`,
	RECOVER_PASSWORD = `${PASSWORD}/recover`,
	UPDATE_PASSWORD = `${PASSWORD}/update`,

	ACCOUNT_EMAIL = `${ACCOUNT}/email`,
	UPDATE_EMAIL = `${ACCOUNT_EMAIL}/update`,
	SEND_EMAIL_VERIFICATION_CODE = `${ACCOUNT_EMAIL}/send-code`,
	VERIFY_EMAIL = `${ACCOUNT_EMAIL}/verify`,

	PROFILE = "/profile",
	UPDATE_PROFILE = `${PROFILE}/update`,
	CHECK_UNIQUE = `${PROFILE}/check-unique`,

	SETTINGS = `${PROFILE}/settings`,
	UPDATE_SETTINGS = `${SETTINGS}/update`,

	AVATAR = `${PROFILE}/avatar`,
	UPDATE_AVATAR = `${AVATAR}/update`,
	DELETE_AVATAR = `${AVATAR}/delete`,
}
