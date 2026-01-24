"use client"

import { useAuth } from "@hooks/auth"
import styles from "@styles/modules/toaster.module.scss"
import { domAnimation, LazyMotion } from "motion/react"
import { type PropsWithChildren, useId } from "react"
import { type DefaultToastOptions, Toaster } from "react-hot-toast"

import { useFetchCurrencies } from "@/shared/lib/hooks/useFetchCurrencies"
import { useNotificationWebsockets } from "@/shared/lib/hooks/websockets/useWebsockets"

import { Cookie } from "../layouts/-cookies/Cookie"

interface IProps extends PropsWithChildren {
	cookie: string | undefined
	session: boolean
}

const mainToastOptions = (id: string): DefaultToastOptions => ({
	id,
	className: styles["main-toaster"],
	duration: 3000,
	position: "top-center"
})

export function ClientMainProvider({ children, cookie, session }: IProps) {
	const { isAuthenticated } = useAuth(!!session)
	const id = useId()

	useNotificationWebsockets(isAuthenticated)
	useFetchCurrencies()

	return (
		<>
			<Toaster position="top-center" toastOptions={mainToastOptions(id)} />

			{cookie !== "true" && <Cookie />}

			<LazyMotion features={domAnimation} strict>
				{children}
			</LazyMotion>
		</>
	)
}
