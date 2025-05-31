export enum EnumAppRoute {
	INDEX = "/",
	DOCS = "/docs",
	PRIVACY_POLICY = `${EnumAppRoute.DOCS}/privacy-policy`,
	COOKIE_POLICY = `${EnumAppRoute.DOCS}/cookie-policy`,
}
