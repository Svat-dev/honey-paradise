export enum EnumApiRoute {
	DOCS = "/docs",

	STATIC = "/static",
	ASSETS = "/assets",
	STATIC_PRODUCTS = `${ASSETS}/products`,
	STATIC_CATEGORIES = `${ASSETS}/categories`,
	AVATARS = "/avatars",
	UPLOAD_AVATARS = `${AVATARS}/uploads`,

	AUTH = "/auth",
	SIGN_IN = "/sign-in",
	LOGOUT = "/logout",

	OAUTH = `${AUTH}/oauth`,
	OAUTH_CALLBACK = "/callback",
	OAUTH_CONNECT = "/connect",

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
	DOWNLOAD_SETTINGS = "/download-settings",
	UPDATE_PROFILE = "/update",
	CHECK_UNIQUE = "/check-unique",

	CONNECTIONS = `${AUTH}/connections`,
	DISCONNECT = "/disconnect",
	ALL_CONNECTIONS = "/all",

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

	CARTS = "/carts",
	GET_MY_CART = "/my",
	ADD_CART_ITEM = "/add-item",
	REMOVE_CART_ITEM = "/remove-item",
	CLEAR_CART = "/clear",

	PRODUCTS = "/products",
	PRODUCTS_CATEGORY = "/cat",

	GET_ALL_PRODUCTS = "/all",
	GET_PRESEARCH_DATA = "/presearch",
	GET_POPULAR_PRODUCTS = "/popular",
	GET_BY_CATEGORY_SLUG = `${PRODUCTS_CATEGORY}/:slug`,

	CREATE_NEW_PRODUCT = "/new",

	FAVORITES_PRODUCTS = "/favorites",
	SWITCH_FAVORITES_PRODUCTS = `${FAVORITES_PRODUCTS}/switch`,
	CLEAR_FAVORITES_PRODUCTS = `${FAVORITES_PRODUCTS}/clear`,

	ORDERS = "/orders",
	CREATE_ORDER = "/create",
	GET_USER_ORDERS = "/all",
}
