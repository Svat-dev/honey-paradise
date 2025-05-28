"use client";

import styles from "@styles/modules/toaster.module.scss";
import dynamic from "next/dynamic";
import { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
const DynamicCookie = dynamic(() => import("../layouts/-cookies/Cookie").then(mod => mod.Cookie), { ssr: false });

export function ClientMainProvider({ children }: PropsWithChildren) {
	return (
		<>
			<Toaster position="top-center" toastOptions={{ id: "main-toaster", className: styles["main-toaster"] }} />
			<DynamicCookie />
			{children}
		</>
	);
}
