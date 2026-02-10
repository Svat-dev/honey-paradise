import { EnumStorageKeys } from "@constants/base"
import Cookies from "js-cookie"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "react-hot-toast"

export const useCookies = () => {
	const isAgreeWithCookies =
		Cookies.get(EnumStorageKeys.IS_AGREE_WITH_COOKIES) || ""
	const t = useTranslations("layout.cookies")
	const [isVisible, setIsVisible] = useState<boolean>(true)

	const remove = () => {
		try {
			setTimeout(() => {
				Cookies.set(EnumStorageKeys.IS_AGREE_WITH_COOKIES, "true", {
					expires: 30
				})
			}, 3000)

			setIsVisible(false)
		} catch (error) {
			const err = error as Error
			toast.error(t("toasters.error", { err: err.name }))
		}
	}

	return {
		isVisible,
		isAgreeWithCookies,
		remove,
		t
	}
}
