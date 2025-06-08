import type { ReactStateHook } from "@/shared/types/base.type";
import type { TSignInFields } from "@schemas/sign-in.schema";
import type { TSignUpFields } from "@schemas/sign-up.schema";
import type InputMask from "imask/esm/controls/input";
import type { InputHTMLAttributes } from "react";

type TSetMask = ReactStateHook<InputMask<{ mask: string; lazy: true }> | undefined>;

export type TFieldNames = keyof TSignInFields | keyof TSignUpFields | "phoneNumber";
export type TInputType = "default" | "radio-group" | "date";

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: TFieldNames;
	label?: string;
	containerClassName?: string;
	clearBtnClassName?: string;
	errorClassName?: string;
	setMask?: TSetMask;
	data?: IRadioGroupData[];
}

export interface IRadioGroupData {
	id: string;
	value: string;
	label: string;
}

export interface IFormDefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: TFieldNames;
	label?: string;
	clearBtnClassName?: string;
	setMask?: TSetMask;
}

export interface IRadioGroupInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: TFieldNames;
	data: IRadioGroupData[] | undefined;
}
