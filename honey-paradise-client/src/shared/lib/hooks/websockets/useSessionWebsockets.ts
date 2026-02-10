import { EnumStorageKeys, EnumWSPaths, EnumWSRoutes } from "@constants/base"
import Cookies from "js-cookie"
import { useCallback, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

import { useWSTelegramAuth } from "./callbacks/useWSTelegramAuth"

export const useSessionWebsockets = (onError: (msg: string) => void) => {
	const {
		accept_callback,
		reject_callback,
		code_lifetime_expired_cb,
		isTgSignInLoading
	} = useWSTelegramAuth()

	const [socket, setSocket] = useState<Socket | null>(null)

	const jwt_token = Cookies.get(EnumStorageKeys.SOCKET_SESSION_TOKEN)

	const connectSocket = useCallback(() => {
		const session_socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
			withCredentials: true,
			path: EnumWSPaths.SESSIONS,
			auth: { token: jwt_token }
		})

		setSocket(session_socket)
	}, [jwt_token])

	useEffect(() => {
		if (socket) {
			socket.on(EnumWSRoutes.TG_ACCEPTED, msg => accept_callback(msg))

			socket.on(EnumWSRoutes.TG_REJECTED, msg => reject_callback(msg, onError))

			socket.on(EnumWSRoutes.TG_CODE_LIFETIME_EXPIRED, msg =>
				code_lifetime_expired_cb(msg, onError)
			)

			return () => {
				socket.disconnect()
			}
		}
	}, [socket])

	useEffect(() => {
		if (!jwt_token && socket)
			return () => {
				socket.disconnect()
			}
	}, [socket, jwt_token])

	return {
		connectSocket,
		isTgSignInLoading
	}
}
