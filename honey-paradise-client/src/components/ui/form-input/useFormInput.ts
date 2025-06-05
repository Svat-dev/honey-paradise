import type { ReactStateHook } from "@/shared/types/base.type";
import { onInputRule } from "@utils/input-rule";
import type InputMask from "imask/esm/controls/input";
import IMask from "imask/esm/core/holder";
import { useTranslations } from "next-intl";
import { type ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { TFieldNames } from "./form-input.type";

export const useFormInput = (name: TFieldNames, setMask?: ReactStateHook<InputMask<{ mask: string; lazy: true }> | undefined>) => {
	const { register, formState, watch, setValue, control, clearErrors } = useFormContext();
	const t = useTranslations("global.sign-in.content.labels");

	const isPassword = name === "password" || name === "confirmPassword";
	const value = watch(name);
	const error = formState.errors[name]?.message || "";
	const input = control._fields[name]?._f?.ref as HTMLInputElement;
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
		// if (name === "fullName") onInputRuleWithSpaces(e.target);
		// else if (!isPhone) onInputRule(e.target);
		if (!isPhone) onInputRule(e.target);
	};

	const clearError = () => {
		if (error) clearErrors(name);
	};

	return {
		t,
		onInput,
		isPassword,
		isShowPassword,
		register,
		setIsShowPassword,
		clear,
		value,
		error,
		clearError,
	};
};
