import type { EnumProviderTypes } from "./enums.type";

export interface IProvider {
	id: string;

	providerId: string;
	type: EnumProviderTypes;

	userId: string;

	updatedAt: Date;
	createdAt: Date;
}

export interface IDefaultProvider {
	id: string;

	providerId: string;
	type: EnumProviderTypes;

	userId: string;
	createdAt: string;
}
