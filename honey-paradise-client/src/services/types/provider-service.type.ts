import type { EnumProviderTypes } from "@/shared/types/models";

export interface IGetAllProvidersResponse {
	id: string;

	providerId: string;
	type: EnumProviderTypes;

	userId: string;

	createdAt: Date;
	updatedAt: Date;
}
