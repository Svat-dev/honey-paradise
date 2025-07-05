import { EnumGenders } from "@/shared/types/models";
import type { TFieldNames } from "../types/form-input.type";
import { useFormInput } from "./useFormInput";
import { useState } from "react";

export const useDropdownInput = (name: TFieldNames) => {
	const { setValue, getValues, t } = useFormInput(name);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onChange = (value: any) => {
		setValue(name, value);
	};

	const label = () => {
		if (name === "gender") {
			const _value = getValues(name);

			if (_value === EnumGenders.MALE) return t("gender.male");
			else if (_value === EnumGenders.FEMALE) return t("gender.female");
			else return t("gender.other");
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
