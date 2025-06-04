"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/shared/lib/hooks/useTheme";
import { cn } from "@utils/base";
import { useTranslations } from "next-intl";
import styles from "../styles/change-theme.module.scss";

const ChangeThemeButton = () => {
	const { theme, toggleTheme } = useTheme();
	const t = useTranslations("layout.sidebar.labels");

	return (
		<button type="button" title={t("changeTheme")} className={styles["button"]} onClick={toggleTheme}>
			<div className={cn(styles["indicator"], { "tw-translate-x-[115%]": theme === "dark" })} />

			<SunIcon />

			<MoonIcon />
		</button>
	);
};

export { ChangeThemeButton };
