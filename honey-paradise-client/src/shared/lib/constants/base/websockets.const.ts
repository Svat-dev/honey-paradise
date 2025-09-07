export enum EnumWSPaths {
	NOTIFICATIONS = "/api/notifications/connect-socket",
	SESSIONS = "/api/auth/connect-socket",
}

export enum EnumWSRoutes {
	NEW_NOTIFICATION = "new-notification",
	NEW_ERROR = "new-error",
	REMOVE_SESSION = "remove-session",

	TG_ACCEPTED = "tg-accepted",
	TG_REJECTED = "tg-rejected",
	TG_CODE_LIFETIME_EXPIRED = "tg-code-lifetime-expired",
}
