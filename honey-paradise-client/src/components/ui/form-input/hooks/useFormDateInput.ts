import { enUS, ru } from "date-fns/locale";
import { useEffect, useState } from "react";

import { EnumLanguages } from "@/shared/lib/i18n";
import type { TFieldNames } from "../types/form-input.type";
import { format } from "date-fns";
import { useFormInput } from "./useFormInput";
import { useLocale } from "next-intl";

export const useFormDateInput = (name: TFieldNames) => {
	const locale = useLocale();
	const { setValue, error, clearErrors } = useFormInput(name);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [date, setDate] = useState<Date | undefined>();

	const fnsLocale = locale === EnumLanguages.RU ? ru : enUS;

	useEffect(() => {
		if (error) clearErrors(name);
		if (date) setValue(name, format(date, "yyyy-MM-dd"));
	}, [date]);

	return {
		fnsLocale,
		isOpen,
		setIsOpen,
		setDate,
		date,
	};
};
