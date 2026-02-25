export interface IJwtTokenPayload {
	token: string

	/* Socket room id, uuid v6 */
	room: string

	ip: string
}
