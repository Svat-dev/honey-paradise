import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { EnumStorageTokens } from "@/shared/lib/constants/base";
import type { TThemes } from "../types/change-theme.type";
import { useTranslations } from "next-intl";

export const useChangeTheme = () => {
	const [theme, setTheme] = useState<TThemes>("light");
	const t = useTranslations("layout.sidebar.labels");

	const changeTheme = (_theme: TThemes, isSystem: boolean = false) => {
		document.body.classList.remove(`${theme}-mode`);
		setTheme(_theme);
		document.body.classList.add(`${_theme}-mode`);

		return isSystem ? true : Cookies.set(EnumStorageTokens.THEME_MODE, _theme);
	};

	useEffect(() => {
		let _theme = (Cookies.get(EnumStorageTokens.THEME_MODE) as TThemes) || null;

		if (!_theme) {
			_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			changeTheme(_theme, true);
			return;
		}

		changeTheme(_theme);
		return;
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";

		return changeTheme(newTheme);
	};

	return {
		theme,
		toggleTheme,
		t,
	};
};
