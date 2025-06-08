import type { TGenders } from "@schemas/sign-up.schema";

export interface IIsActive {
	main: boolean;
	optional: boolean;
}

export interface IGenderRadioGroupData {
	id: string;
	value: TGenders;
	label: string;
}

export type TCurrentPart = "main" | "optional";
export type TDataStatus = "good" | "error" | "default";
