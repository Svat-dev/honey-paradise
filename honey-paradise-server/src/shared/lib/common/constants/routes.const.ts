export enum EnumApiRoute {
	STATIC = "/static",
	ASSETS = `${STATIC}/assets`,
	AVATARS = `${STATIC}/avatars`,

	AUTH = "/auth",
	SIGN_IN = "/sign-in",
	LOGOUT = "/logout",

	TFA = "/tfa",
	VERIFY_TFA = `${TFA}/verify`,
	SEND_TFA_CODE = `${TFA}/send-code`,

	ACCOUNT = `${AUTH}/account`,
	CREATE = "/create",
	ME = "/me",
	UPDATE = "/update",

	PASSWORD = "/password",
	RESET_PASSWORD = `${PASSWORD}/reset`,
	RECOVER_PASSWORD = `${PASSWORD}/recover`,
	UPDATE_PASSWORD = `${PASSWORD}/update`,

	EMAIL = "/email",
	UPDATE_EMAIL = `${EMAIL}/update`,
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
	REMOVE_ALL_SESSIONS = `${SESSION}/remove-all`,
	CLEAR_SESSION = `${SESSION}/clear`,

	NOTIFICATIONS = "/notifications",
	SEND = "/send",
	NOTIFICATIONS_GET_ALL = "/all",
	MARK_AS_READ = "/mark-as-read",
	MARK_AS_ARCHIVED = "/mark-as-archived",
	DELETE_NOTIFICATIONS = "/delete",
}
