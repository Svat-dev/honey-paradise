"use client";

import styles from "@styles/modules/toaster.module.scss";
import type { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { Cookie } from "../layouts/-cookies/Cookie";

interface IProps extends PropsWithChildren {
	cookie: string | undefined;
}

export function ClientMainProvider({ children, cookie }: IProps) {
	return (
		<>
			<Toaster position="top-center" toastOptions={{ id: "main-toaster", className: styles["main-toaster"] }} />
			{cookie !== "true" && <Cookie />}
			{children}
		</>
	);
}
