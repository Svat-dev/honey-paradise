class EnumApiRouteClass {
	PROFILE = "/profile"
	AVATAR = `${this.PROFILE}/avatar`
	SETTINGS = `${this.PROFILE}/settings`

	CHECK_UNIQUE = (data: string) => `${this.PROFILE}/check-unique/${data}`
	UPDATE_PROFILE = `${this.PROFILE}/update`
	UPDATE_AVATAR = `${this.AVATAR}/update`
	UPDATE_FRAME = `${this.AVATAR}/update-frame`
	DELETE_AVATAR = `${this.AVATAR}/delete`
	UPDATE_SETTINGS = `${this.SETTINGS}/update`
	DOWNLOAD_SETTINGS = `${this.SETTINGS}/download`
	UPLOAD_SETTINGS = `${this.SETTINGS}/upload`

	NOTIFICATIONS = "/notifications"
	NOTIFICATIONS_MARK = `${this.NOTIFICATIONS}/mark`

	GET_NOTIFICATIONS = `${this.NOTIFICATIONS}/all`
	UPDATE_NOTIFICATIONS = `${this.NOTIFICATIONS}/settings/update`
	MARK_AS_READ = `${this.NOTIFICATIONS_MARK}/as-read`
	MARK_AS_READ_ALL = `${this.MARK_AS_READ}/all`
	MARK_AS_ARCHIVED = `${this.NOTIFICATIONS_MARK}/as-archived`
	DELETE_NOTIFICATION = `${this.NOTIFICATIONS}/delete`
	SEND_NOTIFICATION = `${this.NOTIFICATIONS}/send`

	AUTH = "/auth"
	ACCOUNT = `${this.AUTH}/account`
	TELEGRAM = `${this.AUTH}/telegram`
	SESSIONS = `${this.AUTH}/sessions`
	TFA = `${this.AUTH}/tfa`
	PROVIDERS = `${this.AUTH}/connections`
	OAUTH = `${this.AUTH}/oauth`

	EMAIL = `${this.ACCOUNT}/email`
	PASSWORD = `${this.ACCOUNT}/password`

	SIGN_IN = `${this.AUTH}/sign-in`
	LOGOUT = `${this.AUTH}/logout`

	GET_MY_ACCOUNT = `${this.ACCOUNT}/my`
	CREATE_ACCOUNT = `${this.ACCOUNT}/create`

	SEND_EMAIL_CODE = `${this.EMAIL}/send-code`
	VERIFY_EMAIL_CODE = `${this.EMAIL}/verify`
	UPDATE_EMAIL = `${this.EMAIL}/update`

	RESET_PASSWORD = `${this.PASSWORD}/reset`
	UPDATE_PASSWORD = `${this.PASSWORD}/update`
	RECOVER_PASSWORD = `${this.PASSWORD}/recover`

	GET_TELEGRAM_INFO = `${this.TELEGRAM}/by-user`
	CONNECT_TELEGRAM = `${this.TELEGRAM}/connect`
	DISCONNECT_TELEGRAM = `${this.TELEGRAM}/disconnect`

	GET_ALL_SESSIONS = `${this.SESSIONS}/all`
	GET_CURRENT_SESSION = `${this.SESSIONS}/current`
	CLEAR_CURRENT_SESSION = `${this.SESSIONS}/clear`
	DELETE_SESSION = (sid: string) => `${this.SESSIONS}/delete/${sid}`
	DELETE_ALL_SESSIONS = `${this.SESSIONS}/delete/all`

	SEND_TFA_CODE = `${this.TFA}/send-code`
	VERIFY_TFA_CODE = `${this.TFA}/verify`
	TG_TFA_SIGN_IN = `${this.TFA}/tg/sign-in`
	TG_TFA_CANCEL = `${this.TFA}/tg/cancel`

	GET_ALL_PROVIDERS = `${this.PROVIDERS}/all`
	DISCONNECT_PROVIDER = `${this.PROVIDERS}/disconnect`
	CONNECT_PROVIDER = (provider: string) => `${this.OAUTH}/connect/${provider}`

	CARTS = "/carts"
	CART_ITEM = `${this.CARTS}/item`

	GET_MY_CART = `${this.CARTS}/my`
	GET_MY_CART_TABLE = `${this.CARTS}/my/table`
	CART_TO_FAVORITES = `${this.CARTS}/to-favorites`
	CLEAR_CART = `${this.CARTS}/clear`

	CREATE_CART_ITEM = `${this.CART_ITEM}/create`
	UPDATE_CART_ITEM = `${this.CART_ITEM}/update`
	DELETE_CART_ITEM = (id: string) => `${this.CART_ITEM}/delete/${id}`

	PRODUCTS = "/products"
	PRODUCT_CATEGORY = `${this.PRODUCTS}/category`
	FAVORITES = `${this.PRODUCTS}/favorites`

	GET_ALL_PRODUCTS = `${this.PRODUCTS}/all`
	GET_PRESEARCH_INFO = `${this.PRODUCTS}/presearch`
	GET_POPULAR_PRODUCTS = `${this.PRODUCTS}/popular`
	GET_PRODUCTS_BY_ID = `${this.PRODUCTS}/by-ids`
	CREATE_PRODUCT = `${this.PRODUCTS}/create`

	GET_PRODUCT_BY_SLUG = (slug: string) => `${this.PRODUCTS}/${slug}/base`
	GET_PRODUCT_RATING_BY_SLUG = (slug: string) =>
		`${this.PRODUCTS}/${slug}/rating`

	GET_CATEGORY_BY_SLUG = (slug: string) => `${this.PRODUCT_CATEGORY}/${slug}`

	GET_ALL_FAVORITES = this.FAVORITES
	SWITCH_FAVORITE = (vid: string) => `${this.FAVORITES}/switch/${vid}`
	CLEAR_FAVORITES = `${this.FAVORITES}/clear`

	PROMO_CODES = "/promo-codes"

	USE_PROMO_CODE = `${this.PROMO_CODES}/use`
	CREATE_PROMO_CODE = `${this.PROMO_CODES}/create`
	DELETE_PROMO_CODE = (id: string) => `${this.PROMO_CODES}/delete/${id}`

	ORDERS = "/orders"

	GET_ALL_ORDERS = `${this.ORDERS}/all`
	GET_ORDER_EXTRA_INFO = (orderId: string) => `${this.ORDERS}/extra/${orderId}`
	CREATE_ORDER = `${this.ORDERS}/create`

	PAYMENTS = "/payments"
	GET_ALL_PAYMENTS = `${this.PAYMENTS}/all`

	REVIEWS = "/reviews"
	COMMENTS = `${this.REVIEWS}/comments`

	GET_REVIEWS_BY_USER = `${this.REVIEWS}/by-user`
	GET_REVIEWS_BY_PID = (pid: string) => `${this.REVIEWS}/by-pid/${pid}`
	CREATE_REVIEW = `${this.REVIEWS}/create`
	EDIT_REVIEW = `${this.REVIEWS}/edit`
	REACT_TO_REVIEW = `${this.REVIEWS}/react`
	DELETE_REVIEW = (id: string) => `${this.REVIEWS}/delete/${id}`

	GET_COMMENTS_BY_REVIEW = (id: string) => `${this.COMMENTS}/${id}`
	CREATE_COMMENT = `${this.COMMENTS}/create`
	REPLY_COMMENT = `${this.COMMENTS}/reply`
	DELETE_COMMENT = (id: string) => `${this.COMMENTS}/delete/${id}`

	TRANSLATE = (id: string) => `/translate/${id}`
}

export const EnumApiRoute = new EnumApiRouteClass()

type EnumApiRoute = Readonly<EnumApiRouteClass>

export enum EnumStaticRoute {
	STATIC = "/static",

	ASSETS = "/assets",
	CATEGORY_ASSETS = `${ASSETS}/categories`,
	PRODUCT_ASSETS = `${ASSETS}/products`,

	AVATARS = "/avatars",
	DEFAULT_AVATAR = `${AVATARS}/default.webp`,
	UPLOADS_AVATARS = `${AVATARS}/uploads`,

	FRAMES = "/frames",
	ANIMATED_FRAMES = `${FRAMES}/animated`
}
