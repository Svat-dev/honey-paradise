import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { EnumStorageTokens } from "../../constants/base";
import { useAuth, useMyAccount } from "../../hooks/auth";
import { LANGS_BY_KEY, type EnumLanguages } from "../config";

export const useLanguage = () => {
	const locale = useLocale();
	const t = useTranslations("toasters.changeLanguage");

	const { refresh } = useRouter();

	const { isAuthenticated } = useAuth();
	const { user } = useMyAccount();

	const change = (lang: EnumLanguages, userDefault: boolean = false) => {
		if (!lang || locale === lang) return;

		try {
			Cookies.set(EnumStorageTokens.LANGUAGE, lang);

			if (!userDefault) {
				const toastText = `${t("success", { lang: LANGS_BY_KEY[lang] })}`;
				toast.success(toastText);
			}

			refresh();
		} catch (e) {
			if (!userDefault) {
				const err = e as Error;
				const toastText = `${t("error", { error: err.name })}`;

				toast.error(toastText);
			}
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			if (user?.settings.defaultLanguage) change(user.settings.defaultLanguage, true);
		}
	}, []);

	return { change, locale };
};
