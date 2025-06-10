import { useTranslations } from "next-intl";

import { EnumLanguages } from "@/shared/lib/i18n";
import { useLanguage } from "@i18n/hooks";
import { ILanguagesList } from "../types/data.type";

export const useAvailableLangs = () => {
	const t = useTranslations("layout.header.sidebarSheet.langsDropdown");
	const { locale } = useLanguage();

	const availableLanguages: ILanguagesList[] = [
		{
			language: t(`langs.${"en"}`),
			value: EnumLanguages.EN,
			isCurrent: locale === String(EnumLanguages.EN),
		},
		{
			language: t("langs.ru"),
			value: EnumLanguages.RU,
			isCurrent: locale === String(EnumLanguages.RU),
		},
	];

	const currentLang = availableLanguages.find(item => item.isCurrent);
	const currentLangText = `${currentLang?.language} (${currentLang?.value.toUpperCase()})`;

	return { data: availableLanguages.sort((a, b) => a.language.localeCompare(b.language)), t, currentLangText };
};
