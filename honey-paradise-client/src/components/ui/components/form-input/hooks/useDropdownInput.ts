import type { IDropdownData, TFieldNames } from "../types/form-input.type";

import { GetMeResponseGender } from "@/shared/types/server";
import { useFormInput } from "./useFormInput";
import { useLanguage } from "@i18n/hooks";
import { useState } from "react";
import { useTheme } from "@hooks/useTheme";

export const useDropdownInput = (name: TFieldNames) => {
	const { localeTheme } = useTheme();
	const { localeLang } = useLanguage();

	const { setValue, getValues, t } = useFormInput(name);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onChange = (value: any) => setValue(name, value);

	const label = (current: IDropdownData | undefined): string | undefined => {
		if (name === "gender") {
			if (getValues(name) === GetMeResponseGender.OTHER) return t("notSpecified.gender");
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
