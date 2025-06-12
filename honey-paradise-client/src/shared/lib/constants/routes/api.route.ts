export enum EnumApiRoute {
	AUTH = "/auth",
	SIGN_IN = `${AUTH}/sign-in`,
	LOGOUT = `${AUTH}/logout`,

	SESSION = `${AUTH}/session`,
	CLEAR_SESSION = `${AUTH}/clear`,
	CURRENT_SESSION = `${SESSION}/current`,
	REMOVE_SESSION = `${SESSION}/remove`,
	GET_SESSION_BY_USER = `${SESSION}/by-user`,

	ACCOUNT = `${AUTH}/account`,
	MY_ACCOUNT = `${ACCOUNT}/me`,
	CREATE_ACCOUNT = `${ACCOUNT}/create`,

	PROFILE = `/profile`,
}
