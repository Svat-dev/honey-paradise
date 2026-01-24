import type { TFieldNames, TInputType } from "../types/form-input.type";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

export const useFormInput = (name: TFieldNames, isDecorated?: boolean, genderType?: "radio-group" | "dropdown") => {
	const { register, formState, watch, setValue, control, clearErrors, getValues } = useFormContext();
	const t = useTranslations("shared.auth");

	const value = watch(name);
	const error = formState.errors[name]?.message || "";
	const input = control._fields[name]?._f.ref as HTMLInputElement;

	const inputType = (): TInputType => {
		switch (name) {
			case "id":
				return isDecorated ? "default-decor" : "default";
			case "email":
				return isDecorated ? "default-decor" : "default";
			case "password":
				return isDecorated ? "default-decor" : "default";
			case "confirmPassword":
				return isDecorated ? "default-decor" : "default";
			case "phone":
				return isDecorated ? "default-decor" : "default";
			case "username":
				return isDecorated ? "default-decor" : "default";
			case "promoCode":
				return isDecorated ? "default-decor" : "default";
			case "gender":
				return genderType === "radio-group" ? "radio-group" : "dropdown";
			case "language":
				return "dropdown";
			case "theme":
				return "dropdown";
			case "currency":
				return "dropdown";
			case "birthdate":
				return "date";
			case "pin":
				return "otp";
			case "comment":
				return "textarea";

			default:
				return "default";
		}
	};

	return {
		t,
		register,
		value,
		error,
		input,
		clearErrors,
		setValue,
		getValues,
		input_type: inputType(),
	};
};
