import type { TFieldNames, TInputType } from "../types/form-input.type";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

export const useFormInput = (name: TFieldNames) => {
	const { register, formState, watch, setValue, control, clearErrors, getValues } = useFormContext();
	const t = useTranslations("shared.auth.labels");

	const value = watch(name);
	const error = formState.errors[name]?.message || "";
	const input = control._fields[name]?._f?.ref as HTMLInputElement;

	const inputType = (): TInputType => {
		switch (name) {
			case "id":
				return "default";
			case "email":
				return "default";
			case "password":
				return "default";
			case "confirmPassword":
				return "default";
			case "phoneNumber":
				return "default";
			case "username":
				return "default";
			case "gender":
				return "radio-group";
			case "birthdate":
				return "date";
			case "pin":
				return "otp";

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
