export enum EnumApiRoute {
	AUTH = "/auth",
	SIGN_IN = `${AUTH}/sign-in`,
	LOGOUT = `${AUTH}/logout`,

	SESSION = `${AUTH}/session`,
	CLEAR_SESSION = `${SESSION}/clear`,
	CURRENT_SESSION = `${SESSION}/current`,
	REMOVE_SESSION = `${SESSION}/remove`,
	GET_SESSION_BY_USER = `${SESSION}/by-user`,

	ACCOUNT = `${AUTH}/account`,
	MY_ACCOUNT = `${ACCOUNT}/me`,
	CREATE_ACCOUNT = `${ACCOUNT}/create`,
	RESET_PASSWORD = `${ACCOUNT}/reset-password`,
	CHANGE_PASSWORD = `${ACCOUNT}/recover-password`,

	ACCOUNT_EMAIL = `${ACCOUNT}/email`,
	SEND_EMAIL_VERIFICATION_CODE = `${ACCOUNT_EMAIL}/send-code`,
	VERIFY_EMAIL = `${ACCOUNT_EMAIL}/verify`,

	PROFILE = "/profile",
	UPDATE_PROFILE = `${PROFILE}/update`,

	SETTINGS = `${PROFILE}/settings`,
	UPDATE_SETTINGS = `${SETTINGS}/update`,

	AVATAR = `${PROFILE}/avatar`,
	UPDATE_AVATAR = `${AVATAR}/update`,
	DELETE_AVATAR = `${AVATAR}/delete`,
}
