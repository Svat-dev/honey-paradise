export const notificationUserOutput = {
	id: true,

	message: true,
	type: true,
	isRead: true,

	createdAt: true,
	updatedAt: true,
}; // Prisma.NotificationSelect

export const notificationSettingsUserOutput = {
	id: true,

	enabled: true,
	withSound: true,

	siteNotificationsType: true,
	telegramNotificationsType: true,

	updatedAt: true,
}; // Prisma.NotificationSettingsSelect
