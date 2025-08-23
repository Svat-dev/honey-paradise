import type { Prisma } from "@prisma/client";

export const providerDefaultOutput: Prisma.ProviderSelect = {
	id: true,

	providerId: true,
	type: true,

	userId: true,
	createdAt: true,
};
