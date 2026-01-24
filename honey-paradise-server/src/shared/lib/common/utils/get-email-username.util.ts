import { VALUES } from "../constants"

export function getEmailUsername(email: string) {
	const atIndex = email.indexOf("@")

	const username = email.substring(0, atIndex)
	const cleanedUsername = username.replace(/[^a-zA-Z0-9_]/g, "")
	const shortUsername = cleanedUsername.substring(0, VALUES.MAX_ID_LENGTH)

	return shortUsername
}
