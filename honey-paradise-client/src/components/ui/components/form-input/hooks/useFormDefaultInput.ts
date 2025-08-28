import { onInputRule } from "@/shared/lib/utils/auth/input-rule";
import type { ReactStateHook } from "@/shared/types/base.type";
import { PHONE_MASK_PATTERN } from "@constants/base";
import IMask, { FactoryArg } from "imask";
import type InputMask from "imask/esm/controls/input";
import { type ChangeEvent, useEffect, useState } from "react";
import type { TFieldNames } from "../types/form-input.type";
import { useFormInput } from "./useFormInput";

export const useFormDefaultInput = (name: TFieldNames, setMask?: ReactStateHook<InputMask<FactoryArg> | undefined>) => {
	const { input, clearErrors, error, setValue, getValues, register, value, t } = useFormInput(name);

	const isPassword = name === "password" || name === "confirmPassword";
	const isPhone = name === "phone";

	let mask: InputMask<FactoryArg>;

	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

	useEffect(() => {
		if (input.type && isPhone) {
			mask = IMask<FactoryArg>(input, {
				mask: PHONE_MASK_PATTERN,
				lazy: true,
			});

			setMask?.(mask);
		} else return;
	}, [input]);

	const clear = () => setValue(name, "", { shouldValidate: true });

	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		if (!isPhone) onInputRule(e.target);
		else {
			if (!input.value) setValue(name, "", { shouldValidate: true });
			else if (input.value.includes("+7 (") && !getValues(name)) setValue(name, input.value, { shouldValidate: true });
		}
	};

	const clearError = () => {
		if (error) clearErrors(name);
	};

	const showPassword = () => setIsShowPassword(prev => !prev);

	return {
		onInput,
		isPassword,
		isShowPassword,
		showPassword,
		clear,
		clearError,
		register,
		value,
		t,
	};
};
