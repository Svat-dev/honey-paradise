import type { IDropdownData, TFieldNames } from "../types/form-input.type";

import { EnumGenders } from "@/shared/types/models";
import { useTheme } from "@hooks/useTheme";
import { useLanguage } from "@i18n/hooks";
import { useState } from "react";
import { useFormInput } from "./useFormInput";

export const useDropdownInput = (name: TFieldNames) => {
	const { localeTheme } = useTheme();
	const { localeLang } = useLanguage();

	const { setValue, getValues, t } = useFormInput(name);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onChange = (value: any) => setValue(name, value);

	const label = (current: IDropdownData | undefined): string | undefined => {
		if (name === "gender") {
			if (getValues(name) === EnumGenders.OTHER) return t("notSpecified.gender");
			else return current?.label || getValues(name);
		} else {
			const values = name === "language" ? localeLang("short") : name === "theme" ? localeTheme("short") : undefined;
			return current?.label || t(`notSpecified.${name}` as any, { current: values } as any) || getValues(name);
		}
	};

	return {
		onChange,
		value: getValues(name),
		isOpen,
		setIsOpen,
		label,
	};
};
