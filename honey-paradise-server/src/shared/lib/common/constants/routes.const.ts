export enum EnumApiRoute {
	STATIC = "/static",
	ASSETS = `${STATIC}/assets`,
	AVATARS = `${STATIC}/avatars`,

	AUTH = "/auth",
	SIGN_IN = "/sign-in",
	LOGOUT = "/logout",

	ACCOUNT = `${AUTH}/account`,
	CREATE = "/create",
	ME = "/me",
	RESET_PASSWORD = "/reset-password",
	RECOVER_PASSWORD = "/recover-password",

	EMAIL = "/email",
	SEND_VERIFICATION_CODE = `${EMAIL}/send-code`,
	VERIFY_EMAIL = `${EMAIL}/verify`,

	PROFILE = "/profile",
	UPDATE_PROFILE = "/update",
	CHECK_UNIQUE = "/check-unique",

	SETTINGS = "/settings",
	UPDATE_SETTINGS = `${SETTINGS}/update`,

	AVATAR = "/avatar",
	UPDATE_AVATAR = `${AVATAR}/update`,
	DELETE_AVATAR = `${AVATAR}/delete`,

	SESSION = "/session",
	SESSION_BY_USER = `${SESSION}/by-user`,
	CURRENT_SESSION = `${SESSION}/current`,
	REMOVE_SESSION = `${SESSION}/remove`,
	CLEAR_SESSION = `${SESSION}/clear`,
}
