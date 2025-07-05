import { EnumGenders } from "@/shared/types/models";
import { useState } from "react";
import type { TFieldNames } from "../types/form-input.type";
import { useFormInput } from "./useFormInput";

export const useDropdownInput = (name: TFieldNames) => {
	const { setValue, getValues } = useFormInput(name);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onChange = (value: any) => {
		setValue(name, value);
	};

	const label = () => {
		if (name === "gender") {
			const _value = getValues(name);

			if (_value === EnumGenders.MALE) return "Мужской";
			else if (_value === EnumGenders.FEMALE) return "Женский";
			else return "Не указан";
		} else return getValues(name);
	};

	return {
		onChange,
		label: label(),
		value: getValues(name),
		isOpen,
		setIsOpen,
	};
};
