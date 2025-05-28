import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EnumStorageTokens } from "../../constants/base";
import { LANGS_BY_KEY, type EnumLanguages } from "../config";

export const useChangeLang = () => {
	const { refresh } = useRouter();
	const locale = useLocale();
	const t = useTranslations("toasters.changeLanguage");

	const change = (lang: EnumLanguages) => {
		if (!lang || locale === lang) return;

		try {
			Cookies.set(EnumStorageTokens.LANGUAGE, lang);

			const toastText = `${t("success", { lang: LANGS_BY_KEY[lang] })}`;
			toast.success(toastText);

			refresh();
		} catch (e) {
			const err = e as Error;
			const toastText = `${t("error", { error: err.name })}`;

			toast.error(toastText);
		}
	};

	return { change };
};
