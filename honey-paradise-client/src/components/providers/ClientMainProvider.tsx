"use client";

import { useFetchCurrencies } from "@/shared/lib/hooks/useFetchCurrencies";
import { useNotificationWebsockets } from "@/shared/lib/hooks/websockets/useWebsockets";
import { useAuth } from "@hooks/auth";
import styles from "@styles/modules/toaster.module.scss";
import { domAnimation, LazyMotion } from "motion/react";
import { useId, type PropsWithChildren } from "react";
import { Toaster, type DefaultToastOptions } from "react-hot-toast";
import { Cookie } from "../layouts/-cookies/Cookie";

interface IProps extends PropsWithChildren {
	cookie: string | undefined;
	session: string | undefined;
}

const mainToastOptions = (id: string): DefaultToastOptions => ({
	id,
	className: styles["main-toaster"],
	duration: 3000,
	position: "top-center",
});

export function ClientMainProvider({ children, cookie, session }: IProps) {
	const { isAuthenticated } = useAuth(!!session);
	const id = useId();

	useNotificationWebsockets(isAuthenticated);
	useFetchCurrencies();

	return (
		<>
			<Toaster position="top-center" toastOptions={mainToastOptions(id)} />

			{cookie !== "true" && <Cookie />}

			<LazyMotion features={domAnimation} strict>
				{children}
			</LazyMotion>
		</>
	);
}
