"use client"

import { cn } from "@utils/base"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { useTheme } from "@/shared/lib/hooks/useTheme"

import styles from "../styles/change-theme.module.scss"

const ChangeThemeButton = () => {
	const { theme, toggleTheme, userTheme } = useTheme()
	const t = useTranslations("layout.root-sidebar.labels")

	if (userTheme !== null) return <></>

	return (
		<button
			type="button"
			title={t("changeTheme")}
			className={styles["button"]}
			onClick={toggleTheme}
		>
			<div
				className={cn(styles["indicator"], {
					"translate-x-[115%]": theme === "dark"
				})}
			/>

			<SunIcon />

			<MoonIcon />
		</button>
	)
}

export { ChangeThemeButton }
