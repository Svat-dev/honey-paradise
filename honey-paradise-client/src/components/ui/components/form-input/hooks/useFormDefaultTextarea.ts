import { onInputRuleWithSpaces } from "@/shared/lib/utils/auth/input-rule";
import type { ChangeEvent } from "react";
import type { TFieldNames } from "../types/form-input.type";
import { useFormInput } from "./useFormInput";

export const useFormDefaultTextarea = (name: TFieldNames) => {
	const { clearErrors, error, setValue, register, value, t } = useFormInput(name);

	const clear = () => setValue(name, "", { shouldValidate: true });

	const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => onInputRuleWithSpaces(e.target);

	const clearError = () => {
		if (error) clearErrors(name);
	};

	return {
		onInput,
		clear,
		clearError,
		register,
		value,
		t,
	};
};
