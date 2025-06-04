import type { ReactStateHook } from "@/shared/types/base.type";
import type { TSignInFields } from "@schemas/sign-in.schema";
import type InputMask from "imask/esm/controls/input";
import type { InputHTMLAttributes } from "react";

export type TFieldNames = keyof TSignInFields | "phoneNumber" | "confirmPassword";

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: TFieldNames;
	label?: string;
	required?: boolean;
	containerClassName?: string;
	clearBtnClassName?: string;
	errorClassName?: string;
	setMask?: ReactStateHook<InputMask<{ mask: string; lazy: true }> | undefined>;
}
