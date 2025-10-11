export enum EnumApiRoute {
	AUTH = "/auth",
	SIGN_IN = `${AUTH}/sign-in`,
	LOGOUT = `${AUTH}/logout`,

	OAUTH = `${AUTH}/oauth`,
	OAUTH_CONNECT = `${OAUTH}/connect`,

	TFA = `${AUTH}/tfa`,
	VERIFY_TFA = `${TFA}/verify`,
	SEND_TFA_CODE = `${TFA}/send-code`,

	SESSION = `${AUTH}/session`,
	CLEAR_SESSION = `${SESSION}/clear`,
	CURRENT_SESSION = `${SESSION}/current`,
	REMOVE_SESSION = `${SESSION}/remove`,
	REMOVE_ALL_SESSIONS = `${SESSION}/remove-all`,
	GET_SESSION_BY_USER = `${SESSION}/by-user`,

	ACCOUNT = `${AUTH}/account`,
	MY_ACCOUNT = `${ACCOUNT}/me`,
	CREATE_ACCOUNT = `${ACCOUNT}/create`,

	TELEGRAM = `${ACCOUNT}/tg`,
	CONNECT_TG = `${TELEGRAM}/connect`,
	DISCONNECT_TG = `${TELEGRAM}/disconnect`,
	TG_TFA_LOGIN = `${AUTH}/tg/2fa-login`,
	CANCEL_TG_TFA_LOGIN = `${AUTH}/tg/cancel-2fa-login`,

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

	CONNECTIONS = `${AUTH}/connections`,
	DISCONNECT = `${CONNECTIONS}/disconnect`,
	ALL_CONNECTIONS = `${CONNECTIONS}/all`,

	AVATAR = `${PROFILE}/avatar`,
	UPDATE_AVATAR = `${AVATAR}/update`,
	DELETE_AVATAR = `${AVATAR}/delete`,

	NOTIFICATIONS = "/notifications",
	NOTIFICATIONS_GET_ALL = `${NOTIFICATIONS}/all`,
	NOTIFICATIONS_MARK_AS = `${NOTIFICATIONS}/mark`,
	MARK_AS_READ = `${NOTIFICATIONS_MARK_AS}/as-read`,
	MARK_AS_READ_ALL = `${MARK_AS_READ}/all`,
	MARK_AS_ARCHIVED = `${NOTIFICATIONS_MARK_AS}/as-archived`,
	DELETE_NOTIFICATIONS = `${NOTIFICATIONS}/delete`,

	SETTINGS = "/settings",
	UPDATE_SETTINGS = `${SETTINGS}/update`,
	UPDATE_PROFILE_SETTINGS = `${PROFILE}${UPDATE_SETTINGS}`,
	UPDATE_NOTIFICATIONS_SETTINGS = `${NOTIFICATIONS}${UPDATE_SETTINGS}`,

	CARTS = "/carts",
	GET_MY_CART = `${CARTS}/my`,
	ADD_CART_ITEM = `${CARTS}/add-item`,
	DELETE_CART_ITEM = `${CARTS}/remove-item`,
	CLEAR_CART = `${CARTS}/clear`,

	PRODUCTS = "/products",
	GET_ALL_PRODUCTS = `${PRODUCTS}/all`,
	CREATE_NEW_PRODUCT = `${PRODUCTS}/new`,
}
