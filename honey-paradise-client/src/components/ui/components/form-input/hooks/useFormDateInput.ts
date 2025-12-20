import { enUS, ru } from "date-fns/locale";
import { useEffect, useState } from "react";
import type { Calendar, Locale } from "vanilla-calendar-pro";

import { useLanguage } from "@i18n/hooks";
import { EnumLanguages } from "@i18n/index";
import { toDate } from "date-fns";
import { useTranslations } from "next-intl";
import type { TFieldNames } from "../types/form-input.type";
import { useFormInput } from "./useFormInput";

export const useFormDateInput = (name: TFieldNames) => {
	const { locale } = useLanguage(false);
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
