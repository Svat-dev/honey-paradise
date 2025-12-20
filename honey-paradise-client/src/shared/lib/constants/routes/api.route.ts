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
	DOWNLOAD_PROFILE_SETTINGS = `${PROFILE}/download-settings`,
	UPLOAD_PROFILE_SETTINGS = `${PROFILE}/upload-settings`,
	UPDATE_PROFILE = `${PROFILE}/update`,
	CHECK_UNIQUE = `${PROFILE}/check-unique`,

	CONNECTIONS = `${AUTH}/connections`,
	DISCONNECT = `${CONNECTIONS}/disconnect`,
	ALL_CONNECTIONS = `${CONNECTIONS}/all`,

	AVATAR = `${PROFILE}/avatar`,
	UPDATE_AVATAR = `${AVATAR}/update`,
	DELETE_AVATAR = `${AVATAR}/delete`,
	UPDATE_AVATAR_FRAME = `${AVATAR}/update-frame`,

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
	ADD_FAVORITES_TO_CART = `${CARTS}/add-favorites`,
	DELETE_CART_ITEM = `${CARTS}/remove-item`,
	UPDATE_CART_ITEM_QUANTITY = `${CARTS}/update-quantity`,
	CLEAR_CART = `${CARTS}/clear`,

	PRODUCTS = "/products",
	PRODUCTS_CATEGORY = `${PRODUCTS}/cat`,

	GET_PRESEARCH_DATA = `${PRODUCTS}/presearch`,
	GET_ALL_PRODUCTS = `${PRODUCTS}/all`,
	GET_POPULAR_PRODUCTS = `${PRODUCTS}/popular`,
	GET_PRODUCT_BY_SLUG = `${PRODUCTS}/by-slug`,
	GET_PRODUCTS_BY_IDS = `${PRODUCTS}/by-ids`,
	GET_PRODUCT_RATING = `${PRODUCTS}/rating`,

	CREATE_NEW_PRODUCT = `${PRODUCTS}/new`,
	FAVORITES_PRODUCTS = `${PRODUCTS}/favorites`,
	SWITCH_FAVORITES_PRODUCTS = `${FAVORITES_PRODUCTS}/switch`,
	CLEAR_FAVORITES_PRODUCTS = `${FAVORITES_PRODUCTS}/clear`,

	REVIEW = "/reviews",
	GET_PRODUCTS_REVIEW = `${REVIEW}/product`,
	CREATE_REVIEW = `${REVIEW}/new`,
	REACT_TO_REVIEW = `${REVIEW}/react`,
	EDIT_REVIEW = `${REVIEW}/edit`,

	ORDERS = "/orders",
	CREATE_ORDER = `${ORDERS}/create`,
	GET_USER_ORDERS = `${ORDERS}/all`,
}

export enum EnumStaticRoute {
	STATIC = "/static",

	ASSETS = "/assets",
	CATEGORY_ASSETS = `${ASSETS}/categories`,
	PRODUCT_ASSETS = `${ASSETS}/products`,

	AVATARS = "/avatars",
	DEFAULT_AVATAR = `${AVATARS}/default.webp`,
	UPLOADS_AVATARS = `${AVATARS}/uploads`,

	FRAMES = "/frames",
	ANIMATED_FRAMES = `${FRAMES}/animated`,
}
