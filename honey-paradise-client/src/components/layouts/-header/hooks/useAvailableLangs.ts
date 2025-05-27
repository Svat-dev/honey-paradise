import { useLocale, useTranslations } from "next-intl";

import { EnumLanguages } from "@/shared/lib/i18n";
import { ILanguagesList } from "../types/data.type";

export const useAvailableLangs = () => {
	const t = useTranslations("layout.header.sidebarSheet.langsDropdown");
	const locale = useLocale();

	const availableLanguages: ILanguagesList[] = [
		{
			language: t(`langs.${"en"}`),
			value: String(EnumLanguages.EN).toUpperCase(),
			isCurrent: locale === String(EnumLanguages.EN),
		},
		{
			language: t("langs.ru"),
			value: String(EnumLanguages.RU).toUpperCase(),
			isCurrent: locale === String(EnumLanguages.RU),
		},
	];

	const currentLang = availableLanguages.find(item => item.isCurrent);
	const currentLangText = `${currentLang?.language} (${currentLang?.value})`;

	return { data: availableLanguages.sort((a, b) => a.language.localeCompare(b.language)), t, currentLangText };
};
