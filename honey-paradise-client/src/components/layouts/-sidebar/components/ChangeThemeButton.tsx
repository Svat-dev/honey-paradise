"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/base";
import styles from "../styles/change-theme.module.scss";
import { useState } from "react";
import { useTranslations } from "next-intl";

const ChangeThemeButton = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const t = useTranslations("layout.sidebar.labels");

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		// document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<button type="button" title={t("changeTheme")} className={styles["button"]} onClick={toggleTheme}>
			<div className={cn(styles["indicator"], { "tw-translate-x-[115%]": theme === "dark" })} />

			<SunIcon />

			<MoonIcon />
		</button>
	);
};

export { ChangeThemeButton };
