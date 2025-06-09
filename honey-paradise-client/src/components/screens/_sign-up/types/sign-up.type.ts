import type { ICreateAccountDto } from "@/services/types/auth-service.type";
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

export interface ICreateAccountMutateData {
	dto: ICreateAccountDto;
	recaptcha: any;
}

export type TCurrentPart = "main" | "optional";
export type TDataStatus = "good" | "error" | "default";
