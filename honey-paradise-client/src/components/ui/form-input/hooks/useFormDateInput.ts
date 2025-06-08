import { enUS, ru } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { Calendar, Locale } from "vanilla-calendar-pro";

import { EnumLanguages } from "@/shared/lib/i18n";
import { toDate } from "date-fns";
import type { TFieldNames } from "../types/form-input.type";
import { useFormInput } from "./useFormInput";

export const useFormDateInput = (name: TFieldNames) => {
	const locale = useLocale();
	const t = useTranslations("global.sign-up.content");

	const { setValue, getValues, error, clearErrors } = useFormInput(name);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [date, setDate] = useState<Date | null>(getValues(name) || null);

	const fnsLocale = locale === EnumLanguages.RU ? ru : enUS;
	const calendarLocale: Locale = locale;

	useEffect(() => {
		if (error) clearErrors(name);
		if (date) setValue(name, date);
	}, [date]);

	const _setDate = (calendar: Calendar) => {
		const date = calendar.context.selectedDates[0];

		setDate(toDate(date));
		setIsOpen(false);
	};

	return {
		fnsLocale,
		calendarLocale,
		isOpen,
		setIsOpen,
		setDate: _setDate,
		date,
		t,
	};
};
