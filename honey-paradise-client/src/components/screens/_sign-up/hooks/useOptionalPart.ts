import { EnumGenders } from "@/shared/types/models";
import { useTheme } from "@hooks/useTheme";
import { useLanguage } from "@i18n/hooks";
import { useTranslations } from "next-intl";
import { useId } from "react";
import type { IGenderRadioGroupData } from "../types/sign-up.type";

export const useOptionalPart = () => {
	const t = useTranslations("global.sign-up.content");
	const { locale } = useLanguage();

	const { theme } = useTheme();

	const radioGroupItemId_1 = useId();
	const radioGroupItemId_2 = useId();
	const radioGroupItemId_3 = useId();

	const data: IGenderRadioGroupData[] = [
		{
			id: radioGroupItemId_1,
			value: EnumGenders.MALE,
			label: t("optional_part.form.gender.opts.male"),
		},
		{
			id: radioGroupItemId_2,
			value: EnumGenders.FEMALE,
			label: t("optional_part.form.gender.opts.female"),
		},
		{
			id: radioGroupItemId_3,
			value: EnumGenders.OTHER,
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
