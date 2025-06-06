import { FormEventHandler, useId } from "react";
import type { IGenderRadioGroupData, TFieldNames } from "../types/form-input.type";

import { useFormInput } from "./useFormInput";

export const useRadioGroupInput = (name: TFieldNames) => {
	const { register, setValue, getValues } = useFormInput(name);

	const radioGroupItemId_1 = useId();
	const radioGroupItemId_2 = useId();
	const radioGroupItemId_3 = useId();

	const data: IGenderRadioGroupData[] = [
		{
			id: radioGroupItemId_1,
			value: "male",
			label: "Мужской",
		},
		{
			id: radioGroupItemId_2,
			value: "female",
			label: "Женский",
		},
		{
			id: radioGroupItemId_3,
			value: "other",
			label: "Не указывать",
		},
	];

	const onChange: FormEventHandler<HTMLDivElement> = element => {
		const wrappers = element.currentTarget.children;
		const wrapper = Array.from(wrappers).find(item => item.querySelector("button")?.dataset.state === "checked");
		const input = wrapper?.querySelector("input");

		setValue("gender", input?.value);
	};

	return {
		onChange,
		data,
		register,
		getValues,
	};
};
