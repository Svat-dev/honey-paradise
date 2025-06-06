export interface IIsActive {
	main: boolean;
	optional: boolean;
}

export type TCurrentPart = "main" | "optional";
export type TDataStatus = "good" | "error" | "default";
