export enum EnumApiRoute {
	// Common
	CREATE = "/create",
	UPDATE = "/update",
	CONNECT = "/connect",
	DISCONNECT = "/disconnect",
	DELETE = "/delete",
	DELETE_ALL = "/delete/all",
	CLEAR = "/clear",
	BY_USER = "/by-user",
	SEND = "/send",
	ALL = "/all",
	MY = "/my",

	// Documentation
	DOCS = "/docs",

	// Static routes
	STATIC = "/static",
	ASSETS = "/assets",
	STATIC_PRODUCTS = `${ASSETS}/products`,
	STATIC_CATEGORIES = `${ASSETS}/categories`,
	AVATARS = "/avatars",
	UPLOAD_AVATARS = `${AVATARS}/uploads`,

	// Auth
	AUTH = "/auth",
	SIGN_IN = "/sign-in",
	LOGOUT = "/logout",

	OAUTH = `${AUTH}/oauth`,
	OAUTH_CALLBACK = "/callback",

	// Two-factor auth
	TFA = "/tfa",
	VERIFY_TFA = `${TFA}/verify`,
	SEND_TFA_CODE = `${TFA}/send-code`,

	// Account
	ACCOUNT = `${AUTH}/account`,
	TELEGRAM = `${AUTH}/telegram`,
	TG_TFA = `${TFA}/tg/sign-in`,
	CANCEL_TG_TFA = `${TFA}/tg/cancel`,

	PASSWORD = "/password",
	RESET_PASSWORD = `${PASSWORD}/reset`,
	RECOVER_PASSWORD = `${PASSWORD}/recover`,
	UPDATE_PASSWORD = `${PASSWORD}/update`,

	EMAIL = "/email",
	UPDATE_EMAIL = `${EMAIL}/update`,
	SEND_VERIFICATION_CODE = `${EMAIL}/send-code`,
	VERIFY_EMAIL = `${EMAIL}/verify`,

	// Profile
	PROFILE = "/profile",
	CHECK_UNIQUE = "/check-unique/:field",

	AVATAR = "/avatar",
	UPDATE_AVATAR = `${AVATAR}/update`,
	DELETE_AVATAR = `${AVATAR}/delete`,
	UPDATE_AVATAR_FRAME = `${AVATAR}/update-frame`,

	// Connections
	CONNECTIONS = `${AUTH}/connections`,

	// Settings
	SETTINGS = "/settings",
	DOWNLOAD_SETTINGS = `${SETTINGS}/download`,
	UPLOAD_SETTINGS = `${SETTINGS}/upload`,
	UPDATE_SETTINGS = `${SETTINGS}/update`,

	// Sessions
	SESSION = `${AUTH}/sessions`,
	CURRENT_SESSION = "/current",
	DELETE_SESSION = `${DELETE}/:sid`,

	// Notifications
	NOTIFICATIONS = "/notifications",
	NOTIFICATIONS_MARK_AS = "/mark",
	MARK_AS_READ = `${NOTIFICATIONS_MARK_AS}/as-read`,
	MARK_AS_READ_ALL = `${MARK_AS_READ}${ALL}`,
	MARK_AS_ARCHIVED = `${NOTIFICATIONS_MARK_AS}/as-archived`,

	// Cart
	CARTS = "/carts",
	GET_MY_CART_TABLE = `${MY}/table`,
	ITEM = "/item",
	CART_TO_FAVORITE = "/to-favorites",

	// Product
	PRODUCTS = "/products",
	PRODUCTS_CATEGORY = "/category",

	GET_ALL_PRODUCTS = "/all",
	GET_PRESEARCH_DATA = "/presearch",
	GET_POPULAR_PRODUCTS = "/popular",
	GET_PRODUCTS_BY_IDS = "/by-ids",
	GET_PRODUCT_BY_SLUG = "/:slug/base",
	GET_PRODUCT_RATING = "/:slug/rating",

	GET_BY_CATEGORY_SLUG = `${PRODUCTS_CATEGORY}/:slug`,

	// Favorites
	FAVORITE_PRODUCTS = `${PRODUCTS}/favorites`,
	SWITCH_FAVORITES = "/switch/:vid",

	// Reviews
	REVIEWS = "/reviews",
	GET_USER_REVIEWS = "/by-user",
	GET_PRODUCT_REVIEWS = "/by-pid/:pid",
	REACT_TO_REVIEW = "/react",
	EDIT_REVIEW = "/edit",

	// Comments
	COMMENTS = "/comments",
	GET_REVIEW_COMMENTS = `${COMMENTS}/:id`,
	CREATE_COMMENT = `${COMMENTS}${CREATE}`,
	REPLY_TO_COMMENT = `${COMMENTS}/reply`,
	DELETE_COMMENT = `${COMMENTS}${DELETE}/:id`,

	// Orders
	ORDERS = "/orders",
	GET_EXTRA_ORDER = "/extra/:orderId",

	// Payments
	PAYMENTS = "/payments",
	YOOKASSA_WEBHOOK = "/hook",

	// Special offers
	OFFERS = "/offers",
	SPECIAL_OFFERS = "/special",
	DISCOUNTS = "/discounts",

	PROMO_CODES = "/promo-codes",
	USE_PROMO_CODE = "/use"
}
