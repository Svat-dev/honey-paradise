"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { cn } from "@utils/base";
import styles from "../styles/change-theme.module.scss";
import { useChangeTheme } from "../hooks/useChangeTheme";

const ChangeThemeButton = () => {
	const { t, theme, toggleTheme } = useChangeTheme();

	return (
		<button type="button" title={t("changeTheme")} className={styles["button"]} onClick={toggleTheme}>
			<div className={cn(styles["indicator"], { "tw-translate-x-[115%]": theme === "dark" })} />

			<SunIcon />

			<MoonIcon />
		</button>
	);
};

export { ChangeThemeButton };
