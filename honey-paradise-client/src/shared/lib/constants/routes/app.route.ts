export enum EnumAppRoute {
	INDEX = "/",

	AUTH = "/auth",
	SIGN_IN = `${EnumAppRoute.AUTH}/sign-in`,
	SIGN_UP = `${EnumAppRoute.AUTH}/sign-up`,

	DOCS = "/docs",
	PRIVACY_POLICY = `${EnumAppRoute.DOCS}/privacy-policy`,
	COOKIE_POLICY = `${EnumAppRoute.DOCS}/cookie-policy`,
}
