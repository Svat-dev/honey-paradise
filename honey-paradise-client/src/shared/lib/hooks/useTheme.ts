import { useEffect, useMemo, useState } from "react";
import { useAuth, useMyAccount } from "./auth";

import { TThemes } from "@/shared/types/base.type";
import { EnumStorageKeys } from "@constants/base";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

export const useTheme = () => {
	const t = useTranslations("shared.theme");
	const [theme, setTheme] = useState<TThemes>("light");

	const { isAuthenticated } = useAuth();
	const { user } = useMyAccount();

	const changeTheme = (_theme: TThemes, isSystem: boolean = false) => {
		document.body.classList.remove(`${theme}-mode`);
		setTheme(_theme);
		document.body.classList.add(`${_theme}-mode`);

		return isSystem ? true : Cookies.set(EnumStorageKeys.THEME_MODE, _theme);
	};

	const localeTheme = (type: "full" | "short") => {
		if (theme === "light") return t(`light.${type}`);
		else return t(`dark.${type}`);
	};

	useEffect(() => {
		let _theme = (Cookies.get(EnumStorageKeys.THEME_MODE) as TThemes) || null;

		if (!_theme) {
			_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			changeTheme(_theme, true);
			return;
		} else if (isAuthenticated) {
			if (user?.settings.defaultTheme) {
				const _theme = user?.settings.defaultTheme?.toLowerCase();
				changeTheme(_theme as TThemes);

				return;
			}
		}

		changeTheme(_theme);
		return;
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";

		return changeTheme(newTheme);
	};

	return useMemo(
		() => ({
			theme,
			toggleTheme,
			localeTheme,
			userTheme: user?.settings.defaultTheme || null,
		}),
		[theme, toggleTheme, localeTheme, user?.settings.defaultTheme]
	);
};
