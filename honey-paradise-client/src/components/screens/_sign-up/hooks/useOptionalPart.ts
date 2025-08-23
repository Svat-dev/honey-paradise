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

	const id1 = useId();
	const id2 = useId();
	const id3 = useId();

	const data: IGenderRadioGroupData[] = useMemo(
		() => [
			{
				id: id1,
				value: EnumGenders.MALE,
				label: t("optional_part.form.gender.opts.male"),
			},
			{
				id: id2,
				value: EnumGenders.FEMALE,
				label: t("optional_part.form.gender.opts.female"),
			},
			{
				id: id3,
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
