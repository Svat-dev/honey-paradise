export const queryKeys = {
	getMyAccount: "get current account",
	getAllUserNotifications: "get all notifications",
	getUniqueFiledStatus: "get unique filed status",
	getAllProviders: "get all user providers",
	getUserSessions: "get all user sessions",
	getCurrentSession: "get current user session",
	getTelegramInfo: "get user telegram info",
	getMyCart: "get current user cart",
	getAllCatsWithProducts: "get all categories with products",

	recoverPassword: "account recover password",
	createAccount: "account create",
	connectTg: "account connect telegram",
	disconnectTg: "account disconnect telegram",

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
	telegramSignIn: "sign in with telegram",
	cancelTelegramSignIn: "cancel signing in with telegram",

	deleteNotifications: "delete selected notifications",
	deleteProfileAvatar: "delete profile avatar",
	deleteProvider: "delete user provider",
	deleteSession: "delete user session",
	deleteAllSessions: "delete all user sessions",
	deleteCartItem: "delete cart item",
	clearSession: "clear current cookie session",
	clearAllCart: "clear all cart items",

	addCartItem: "add item to cart",

	markNotificationAsRead: "mark notification as read",
	markNotificationAsArchived: "mark all notifications as read",
	markAllNotificationAsRead: "mark notification as archived",
} as const;
