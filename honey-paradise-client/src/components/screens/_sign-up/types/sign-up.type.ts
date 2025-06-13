import type { EnumGenders } from "@/shared/types/models";

export interface IIsActive {
	main: boolean;
	optional: boolean;
}

export interface IGenderRadioGroupData {
	id: string;
	value: EnumGenders;
	label: string;
}

export type TCurrentPart = "main" | "optional";
export type TDataStatus = "good" | "error" | "default";
