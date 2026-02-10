import Cookies from "js-cookie"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/dist/client/components/navigation"
import { useEffect, useMemo } from "react"
import { toast } from "react-hot-toast"

import { GetMySettingsResponseDefaultLanguage } from "@/shared/types/server"

import { EnumStorageKeys } from "../../constants/base"
import { useAuth, useMyAccount } from "../../hooks/auth"
import { type EnumLanguages, LANGS_BY_KEY } from "../config"

export const useLanguage = (auth: boolean = true) => {
	const locale = useLocale()
	const t = useTranslations("toasters.changeLanguage")

	const { refresh } = useRouter()

	const { isAuthenticated } = useAuth()
	const { user } = useMyAccount(auth)

	const change = (
		lang: GetMySettingsResponseDefaultLanguage,
		userDefault: boolean = false
	) => {
		if (!lang || locale === lang) return

		try {
			Cookies.set(EnumStorageKeys.LANGUAGE, lang)

			if (!userDefault) {
				const toastText = `${t("success", { lang: LANGS_BY_KEY[lang] })}`
				toast.success(toastText)
			}

			refresh()
		} catch (e) {
			if (!userDefault) {
				const err = e as Error
				const toastText = `${t("error", { error: err.name })}`

				toast.error(toastText)
			}
		}
	}

	const localeLang = (type: "full" | "short"): string => {
		if (type === "full") return LANGS_BY_KEY[`${locale}_full` as EnumLanguages]
		else return LANGS_BY_KEY[locale as EnumLanguages]
	}

	useEffect(() => {
		if (isAuthenticated) {
			if (user?.settings.defaultLanguage)
				change(user.settings.defaultLanguage, true)
		}
	}, [])

	return useMemo(
		() => ({ change, locale, localeLang }),
		[locale, user, isAuthenticated]
	)
}
