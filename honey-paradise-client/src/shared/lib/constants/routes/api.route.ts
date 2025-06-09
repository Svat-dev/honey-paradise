export enum EnumApiRoute {
	AUTH = "/auth",
	SIGN_IN = `${AUTH}/sign-in`,

	ACCOUNT = `${AUTH}/account`,
	CREATE_ACCOUNT = `${ACCOUNT}/create`,
}
