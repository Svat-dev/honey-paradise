import { useAuth, useMyAccount } from "./auth";
import { useEffect, useMemo, useState } from "react";

import Cookies from "js-cookie";
import { EnumStorageTokens } from "@constants/base";
import { TThemes } from "@/shared/types/base.type";

export const useTheme = () => {
	const [theme, setTheme] = useState<TThemes>("light");
	const { isAuthenticated } = useAuth();
	const { user } = useMyAccount();

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
		}),
		[theme, toggleTheme]
	);
};
