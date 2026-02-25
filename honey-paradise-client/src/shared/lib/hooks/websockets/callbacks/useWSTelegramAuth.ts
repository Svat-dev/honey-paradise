import { EnumAppRoute } from "@constants/routes"
import { useAuth } from "@hooks/auth"
import type { AxiosError } from "axios"
import Cookie from "js-cookie"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { z } from "zod"

import { errorCatch } from "@/api/api-helper"
import { useTelegramSignInS } from "@/services/hooks/auth"
import { EnumStorageKeys } from "@/shared/lib/constants/base"

export const useWSTelegramAuth = () => {
	const { auth } = useAuth()
	const t = useTranslations("toasters.auth")

	const { replace, prefetch } = useRouter()
	const pathname = usePathname()

	const { tgSignIn, isTgSignInLoading } = useTelegramSignInS()

	const accept_callback = async (server_msg: {
		error?: boolean
		message?: string
		token: string
	}) => {
		if (server_msg.error || !server_msg.token)
			return toast.error(server_msg.message || t("error"), { duration: 5000 })

		const validateMessage = z.object({ token: z.string().uuid() })
		const result = validateMessage.safeParse(server_msg)

		if (!result.success) return false

		try {
			const token = result.data.token
			await tgSignIn(token)

			toast.success(t("reqAccepted"), { duration: 3000 })
			prefetch(EnumAppRoute.SETTINGS)
			auth()

			setTimeout(() => replace(EnumAppRoute.SETTINGS), 3000)

			return true
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError)
			toast.error(errMsg, { duration: 5000 })

			return false
		}
	}

	const reject_callback = async (
		server_msg: { message: string },
		onError: (msg: string) => void
	) => {
		const validateMessage = z.object({ message: z.string().nonempty() })
		const result = validateMessage.safeParse(server_msg)

		if (!result.success) return false

		const msg = result.data.message

		onError(msg)
		replace(pathname + "?waiting=false")

		Cookie.remove(EnumStorageKeys.SOCKET_SESSION_TOKEN)

		return true
	}

	const code_lifetime_expired_cb = async (
		server_msg: { message: string },
		onError: (msg: string) => void
	) => {
		const validateMessage = z.object({ message: z.string().nonempty() })
		const result = validateMessage.safeParse(server_msg)

		if (!result.success) return false

		const msg = result.data.message

		onError(msg)
		replace(pathname + "?waiting=false")

		Cookie.remove(EnumStorageKeys.SOCKET_SESSION_TOKEN)

		return true
	}

	return {
		isTgSignInLoading,
		accept_callback,
		reject_callback,
		code_lifetime_expired_cb
	}
}
