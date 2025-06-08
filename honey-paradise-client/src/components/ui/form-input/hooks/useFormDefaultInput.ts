import type { ReactStateHook } from "@/shared/types/base.type";
import { onInputRule } from "@utils/input-rule";
import type InputMask from "imask/esm/controls/input";
import IMask from "imask/esm/core/holder";
import { type ChangeEvent, useEffect, useState } from "react";
import type { TFieldNames } from "../types/form-input.type";
import { useFormInput } from "./useFormInput";

export const useFormDefaultInput = (name: TFieldNames, setMask?: ReactStateHook<InputMask<{ mask: string; lazy: true }> | undefined>) => {
	const { input, clearErrors, error, setValue, register, value, t } = useFormInput(name);

	const isPassword = name === "password" || name === "confirmPassword";
	const isPhone = name === "phoneNumber";

	let mask: InputMask<{ mask: string; lazy: true }>;

	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

	useEffect(() => {
		if (input.type && isPhone) {
			mask = IMask(input, {
				mask: "+{7} (000) 000-00-00",
				lazy: true,
			});

			setMask?.(mask);
		} else return;
	}, [input]);

	const clear = () => setValue(name, "", { shouldValidate: true });

	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		if (!isPhone) onInputRule(e.target);
	};

	const clearError = () => {
		if (error) clearErrors(name);
	};

	return {
		onInput,
		isPassword,
		isShowPassword,
		setIsShowPassword,
		clear,
		clearError,
		register,
		value,
		t,
	};
};
