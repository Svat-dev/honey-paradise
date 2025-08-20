import { useId, useMemo } from "react";

import { EnumGenders } from "@/shared/types/models";
import { useTheme } from "@hooks/useTheme";
import { useLanguage } from "@i18n/hooks";
import { useTranslations } from "next-intl";
import type { IGenderRadioGroupData } from "../types/sign-up.type";

export const useOptionalPart = () => {
	const t = useTranslations("global.sign-up.content");
	const { locale } = useLanguage();

	const { theme } = useTheme();

	const data: IGenderRadioGroupData[] = useMemo(
		() => [
			{
				id: useId(),
				value: EnumGenders.MALE,
				label: t("optional_part.form.gender.opts.male"),
			},
			{
				id: useId(),
				value: EnumGenders.FEMALE,
				label: t("optional_part.form.gender.opts.female"),
			},
			{
				id: useId(),
				value: EnumGenders.OTHER,
				label: t("optional_part.form.gender.opts.other"),
			},
		],
		[locale]
	);

	return {
		data,
		locale,
		theme,
		t,
	};
};
