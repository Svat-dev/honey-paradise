export interface IProviderUser {
	email: string
	username?: string
	avatar?: string

	provider: string
	providerId: string

	accessToken: string
}
