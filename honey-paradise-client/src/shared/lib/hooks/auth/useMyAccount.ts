import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import toast from "react-hot-toast"

import { useMyAccountS } from "@/services/hooks/account"
import { useLogoutS } from "@/services/hooks/auth"
import { useClearSessionS } from "@/services/hooks/session"

import { useAuth } from "./useAuth"

export const useMyAccount = (enabled: boolean = true) => {
	const { isAuthenticated, exit, auth } = useAuth()
	const { refresh } = useRouter()

	const { acc, accError, accRefetch, isAccLoading, isAccSuccess } =
		useMyAccountS(enabled)
	const { logoutAsync, isLogoutLoading } = useLogoutS()
	const { clearSession } = useClearSessionS()

	const logout = async () => {
		try {
			await logoutAsync()

			exit()
			refresh()
		} catch (error) {
			toast.error("Не удалось выйти из аккаунта!")
		}
	}

	useEffect(() => {
		if (accError) {
			if (String(accError.code) === "429") return
			if (String(accError.code) === "404") return clearSession()

			return exit()
		}

		if (!isAuthenticated && !accError) {
			accRefetch()
			if (isAccSuccess) auth()
		}
	}, [isAuthenticated, acc?.data, accError, isAccSuccess])

	return useMemo(
		() => ({
			user: acc?.data,
			isAccLoading: isLogoutLoading || isAccLoading,
			accRefetch,
			logout,
			accError,
			isAccSuccess
		}),
		[
			acc?.data,
			isAccLoading,
			isLogoutLoading,
			accError,
			accRefetch,
			isAccSuccess,
			isAuthenticated
		]
	)
}
