import type { FormEventHandler } from "react";
import type { TFieldNames } from "../types/form-input.type";
import { useFormInput } from "./useFormInput";

export const useRadioGroupInput = (name: TFieldNames) => {
	const { register, setValue, getValues } = useFormInput(name);

	const onChange: FormEventHandler<HTMLDivElement> = element => {
		const wrappers = element.currentTarget.children;
		const wrapper = Array.from(wrappers).find(item => item.querySelector("button")?.dataset.state === "checked");
		const input = wrapper?.querySelector("input");

		setValue(name, input?.value);
	};

	return {
		onChange,
		register,
		value: getValues(name),
	};
};
