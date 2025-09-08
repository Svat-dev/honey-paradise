import type { Prisma } from "@prisma/client";
import { notificationSettingsUserOutput } from "./notifications.output";

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
	defaultCurrency: true,

	useFullLogout: true,
	useTgTfaLogin: true,

	updatedAt: true,
};

export const userFullOutput: Prisma.UserSelect = {
	...userDefaultOutput,
	avatarPath: true,
	birthdate: true,
	gender: true,
	phoneNumber: true,

	settings: { select: userSettingsOutput },
	notificationSettings: { select: notificationSettingsUserOutput },
	cart: true,

	isTFAEnabled: true,
	isVerified: true,

	createdAt: true,
};
