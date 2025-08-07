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

export const userFullOutput: Prisma.UserSelect = {
	...userDefaultOutput,
	avatarPath: true,
	birthdate: true,
	gender: true,
	phoneNumber: true,
	createdAt: true,
	settings: true,
	notificationSettings: true,
	cart: true,
	isVerified: true,
	isTFAEnabled: true,
};
