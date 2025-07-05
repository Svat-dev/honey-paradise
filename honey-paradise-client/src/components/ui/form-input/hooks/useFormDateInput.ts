import type { Calendar, Locale } from "vanilla-calendar-pro";
import { enUS, ru } from "date-fns/locale";
import { useEffect, useState } from "react";

import { EnumLanguages } from "@/shared/lib/i18n";
import type { TFieldNames } from "../types/form-input.type";
import { toDate } from "date-fns";
import { useFormInput } from "./useFormInput";
import { useLanguage } from "@i18n/hooks";
import { useTranslations } from "next-intl";

export const useFormDateInput = (name: TFieldNames) => {
	const { locale } = useLanguage();
	const t = useTranslations("global.sign-up.content");

	const { setValue, getValues, error, clearErrors } = useFormInput(name);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [date, setDate] = useState<Date | null>(null);

	const fnsLocale = locale === EnumLanguages.RU ? ru : enUS;
	const calendarLocale: Locale = locale;

	useEffect(() => {
		if (!date && getValues(name)) return setDate(getValues(name));
		else if (date && getValues(name) === undefined) return setDate(null);
	}, [getValues(name)]);

	useEffect(() => {
		if (error) clearErrors(name);
		if (date) setValue(name, date);
	}, [date]);

	const _setDate = (calendar: Calendar) => {
		const date = calendar.context.selectedDates[0];

		setIsOpen(false);
		setDate(toDate(date));
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
