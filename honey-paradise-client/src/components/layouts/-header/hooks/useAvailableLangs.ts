import { useLanguage } from "@i18n/hooks"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { EnumLanguages } from "@/shared/lib/i18n"

import { ILanguagesList } from "../types/data.type"

export const useAvailableLangs = () => {
	const t = useTranslations("layout.header.sidebarSheet.langsDropdown")
	const { locale } = useLanguage(false)

	const availableLanguages: ILanguagesList[] = useMemo(
		() => [
			{
				language: t(`langs.en`),
				value: EnumLanguages.EN,
				isCurrent: locale === String(EnumLanguages.EN)
			},
			{
				language: t("langs.ru"),
				value: EnumLanguages.RU,
				isCurrent: locale === String(EnumLanguages.RU)
			}
		],
		[locale]
	)

	const currentLang = availableLanguages.find(item => item.isCurrent)
	const currentLangText = `${currentLang?.language} (${currentLang?.value.toUpperCase()})`

	return {
		data: availableLanguages.sort((a, b) =>
			a.language.localeCompare(b.language)
		),
		t,
		currentLangText
	}
}
