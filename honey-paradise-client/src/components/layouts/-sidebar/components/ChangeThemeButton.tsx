"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/base";
import styles from "../styles/change-theme.module.scss";
import { useState } from "react";

const ChangeThemeButton = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		// document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<button type="button" className={styles["button"]} onClick={toggleTheme}>
			<div className={cn(styles["indicator"], { "tw-translate-x-[115%]": theme === "dark" })} />

			<SunIcon />

			<MoonIcon />
		</button>
	);
};

export { ChangeThemeButton };
