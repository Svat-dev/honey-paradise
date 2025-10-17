import { notificationSettingsUserOutput } from "./notifications.output";

//Prisma.UserSelect
export const userDefaultOutput = {
	id: true,
	role: true,

	username: true,
	email: true,
	telegramId: true,
	phoneNumber: true,

	avatarPath: true,
	likedProductIds: true,

	isTFAEnabled: true,
};

//Prisma.UserSelect
export const userServerOutput = {
	...userDefaultOutput,
	password: true,
	isVerified: true,
};

//Prisma.UserSettingsSelect
export const userSettingsOutput = {
	id: true,

	defaultLanguage: true,
	defaultTheme: true,
	defaultCurrency: true,

	useFullLogout: true,
	useTgTfaLogin: true,

	updatedAt: true,
};

//Prisma.UserSelect
export const userFullOutput = {
	...userDefaultOutput,
	birthdate: true,
	gender: true,

	settings: { select: userSettingsOutput },
	notificationSettings: { select: notificationSettingsUserOutput },

	isTFAEnabled: true,
	isVerified: true,

	createdAt: true,
	updatedAt: true,
};
