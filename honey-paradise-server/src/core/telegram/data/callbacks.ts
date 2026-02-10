export const BotCallbacks = {
	DISCONNECT: "disconnect_callback",
	DISCONNECT_YES: "disconnect_callback_yes",
	DISCONNECT_NO: "disconnect_callback_no",

	READ_NOTIFICATION: "read_notification_cb",

	ACCEPT_AUTH: "2faacb",
	REJECT_AUTH: "reject_2fa_auth"
} as const
