import type { EnumProviderTypes } from "@/shared/types/models";

export interface IConnectionsData {
	name: string;
	type: EnumProviderTypes;
	src: string;
}
