import { enUS, ru } from "date-fns/locale";
import { useEffect, useState } from "react";
import type { FormatDateString, Locale } from "vanilla-calendar-pro";

import { EnumLanguages } from "@/shared/lib/i18n";
import { format } from "date-fns";
import { useLocale } from "next-intl";
import type { TFieldNames } from "../types/form-input.type";
import { useFormInput } from "./useFormInput";

export const useFormDateInput = (name: TFieldNames) => {
	const locale = useLocale();
	const { setValue, error, clearErrors } = useFormInput(name);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [date, setDate] = useState<FormatDateString>();

	const fnsLocale = locale === EnumLanguages.RU ? ru : enUS;
	const calendarLocale: Locale = locale;

	useEffect(() => {
		if (error) clearErrors(name);
		if (date) setValue(name, format(date, "yyyy-MM-dd"));
	}, [date]);

	return {
		fnsLocale,
		calendarLocale,
		isOpen,
		setIsOpen,
		setDate,
		date,
	};
};
