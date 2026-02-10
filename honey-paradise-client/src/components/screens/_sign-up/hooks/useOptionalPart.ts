import { useTheme } from "@hooks/useTheme"
import { useLanguage } from "@i18n/hooks"
import { useTranslations } from "next-intl"
import { useId, useMemo } from "react"

import { GetMeResponseGender } from "@/shared/types/server"

import type { IGenderRadioGroupData } from "../types/sign-up.type"

export const useOptionalPart = () => {
	const t = useTranslations("global.sign-up.content")
	const { locale } = useLanguage(false)

	const { theme } = useTheme()

	const id1 = useId()
	const id2 = useId()
	const id3 = useId()

	const data: IGenderRadioGroupData[] = useMemo(
		() => [
			{
				id: id1,
				value: GetMeResponseGender.MALE,
				label: t("optional_part.form.gender.opts.male")
			},
			{
				id: id2,
				value: GetMeResponseGender.FEMALE,
				label: t("optional_part.form.gender.opts.female")
			},
			{
				id: id3,
				value: GetMeResponseGender.OTHER,
				label: t("optional_part.form.gender.opts.other")
			}
		],
		[locale]
	)

	return {
		data,
		locale,
		theme,
		t
	}
}
