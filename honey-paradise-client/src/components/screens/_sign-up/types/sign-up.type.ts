import type { GetMeResponseGender } from "@/shared/types/server";

export interface IIsActive {
	main: boolean;
	optional: boolean;
}

export interface IGenderRadioGroupData {
	id: string;
	value: GetMeResponseGender;
	label: string;
}

export type TCurrentPart = "main" | "optional";
export type TDataStatus = "good" | "error" | "default";
