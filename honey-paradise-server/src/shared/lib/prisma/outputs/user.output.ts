import { notificationSettingsUserOutput, notificationUserOutput } from "./notifications.output";

import type { Prisma } from "@prisma/client";

export const userDefaultOutput: Prisma.UserSelect = {
	id: true,
	role: true,

	username: true,
	email: true,
	telegramId: true,
};

export const userServerOutput: Prisma.UserSelect = {
	...userDefaultOutput,
	password: true,
	isTFAEnabled: true,
	isVerified: true,
};

export const userSettingsOutput: Prisma.UserSettingsSelect = {
	id: true,

	defaultLanguage: true,
	defaultTheme: true,
	useFullLogout: true,

	updatedAt: true,
};

export const userFullOutput: Prisma.UserSelect = {
	...userDefaultOutput,
	avatarPath: true,
	birthdate: true,
	gender: true,
	phoneNumber: true,

	settings: { select: userSettingsOutput },
	cart: true,
	notifications: { select: notificationUserOutput, orderBy: { createdAt: "desc" } },
	notificationSettings: { select: notificationSettingsUserOutput },

	isTFAEnabled: true,
	isVerified: true,

	createdAt: true,
};
