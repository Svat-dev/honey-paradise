export enum EnumApiRoute {
	AUTH = "/auth",
	SIGN_IN = `${AUTH}/sign-in`,
	CLEAR_SESSION = `${AUTH}/clear-session`,
	LOGOUT = `${AUTH}/logout`,

	ACCOUNT = `${AUTH}/account`,
	MY_ACCOUNT = `${ACCOUNT}/me`,
	CREATE_ACCOUNT = `${ACCOUNT}/create`,

	PROFILE = `/profile`,
}
