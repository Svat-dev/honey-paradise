import type { Prisma } from "@prisma/client";

export const userDefaultOutput: Prisma.UserSelect = {
	id: true,
	username: true,
	email: true,
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
	createdAt: true,
};
