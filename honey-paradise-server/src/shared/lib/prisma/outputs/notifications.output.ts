import type { Prisma } from "@prisma/client";

export const notificationUserOutput: Prisma.NotificationSelect = {
	id: true,

	message: true,
	type: true,
	isRead: true,

	createdAt: true,
	updatedAt: true,
};

export const notificationSettingsUserOutput: Prisma.NotificationSettingsSelect = {
	id: true,

	enabled: true,
	withSound: true,

	siteNotificationsType: true,
	telegramNotificationsType: true,

	updatedAt: true,
};
