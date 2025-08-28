export const queryKeys = {
	getMyAccount: "get current account",
	getAllUserNotifications: "get all notifications",
	getUniqueFiledStatus: "get unique filed status",
	getAllProviders: "get all user providers",
	getUserSessions: "get all user sessions",
	getCurrentSession: "get current user session",

	recoverPassword: "account recover password",
	createAccount: "account create",

	sendRecoverPasswordCode: "send password recover code",
	sendVerificationCode: "send email verification code",
	sendTfaCode: "send tfa sign in code",

	verifyEmail: "verify account email",
	verifyTfaCode: "verify tfa code",

	updateEmail: "update account email",
	updateNotificationsSettings: "update notifications settings",
	updatePassword: "update account password",
	updateProfileAvatar: "update profile avatar",
	updateProfile: "update profile",
	updateProfileSettings: "update profile settings",

	logout: "logout",
	signIn: "sign in",

	deleteNotifications: "delete selected notifications",
	deleteProfileAvatar: "delete profile avatar",
	deleteProvider: "delete user provider",
	clearSession: "clear current cookie session",
	deleteSession: "delete user session",
	deleteAllSessions: "delete all user sessions",

	markNotificationAsRead: "mark notification as read",
	markNotificationAsArchived: "mark all notifications as read",
	markAllNotificationAsRead: "mark notification as archived",
} as const;
