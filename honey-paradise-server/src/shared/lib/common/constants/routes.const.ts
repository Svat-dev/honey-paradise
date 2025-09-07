export enum EnumApiRoute {
	STATIC = "/static",
	ASSETS = `${STATIC}/assets`,
	AVATARS = `${STATIC}/avatars`,

	AUTH = "/auth",
	SIGN_IN = "/sign-in",
	LOGOUT = "/logout",

	OAUTH = "/oauth",
	OAUTH_CALLBACK = `${OAUTH}/callback`,
	OAUTH_CONNECT = `${OAUTH}/connect`,

	TFA = "/tfa",
	VERIFY_TFA = `${TFA}/verify`,
	SEND_TFA_CODE = `${TFA}/send-code`,

	ACCOUNT = `${AUTH}/account`,
	CREATE = "/create",
	ME = "/me",
	UPDATE = "/update",

	TELEGRAM = "/tg",
	DISCONNECT_TG = `${TELEGRAM}/disconnect`,
	CONNECT_TG = `${TELEGRAM}/connect`,
	TG_TFA_LOGIN = `${TELEGRAM}/2fa-login`,
	CANCEL_TG_TFA_LOGIN = `${TELEGRAM}/cancel-2fa-login`,

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

	CONNECTIONS = "/connections",
	DISCONNECT = `${CONNECTIONS}/disconnect`,
	ALL_CONNECTIONS = `${CONNECTIONS}/all`,

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
	NOTIFICATIONS_MARK_AS = "/mark",
	MARK_AS_READ = `${NOTIFICATIONS_MARK_AS}/as-read`,
	MARK_AS_READ_ALL = `${MARK_AS_READ}/all`,
	MARK_AS_ARCHIVED = `${NOTIFICATIONS_MARK_AS}/as-archived`,
	DELETE_NOTIFICATIONS = "/delete",
}
