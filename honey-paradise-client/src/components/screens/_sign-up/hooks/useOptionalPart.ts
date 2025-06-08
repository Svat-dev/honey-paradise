import { useLocale, useTranslations } from "next-intl";

import { useTheme } from "@hooks/useTheme";
import { useId } from "react";
import type { IGenderRadioGroupData } from "../types/sign-up.type";

export const useOptionalPart = () => {
	const t = useTranslations("global.sign-up.content");
	const locale = useLocale();

	const { theme } = useTheme();

	const radioGroupItemId_1 = useId();
	const radioGroupItemId_2 = useId();
	const radioGroupItemId_3 = useId();

	const data: IGenderRadioGroupData[] = [
		{
			id: radioGroupItemId_1,
			value: "male",
			label: t("optional_part.form.gender.opts.male"),
		},
		{
			id: radioGroupItemId_2,
			value: "female",
			label: t("optional_part.form.gender.opts.female"),
		},
		{
			id: radioGroupItemId_3,
			value: "other",
			label: t("optional_part.form.gender.opts.other"),
		},
	];

	return {
		data,
		locale,
		theme,
		t,
	};
};
