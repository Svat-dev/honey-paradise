import "./main.scss";

import { MainProvider } from "@/components/providers/MainProvider";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Rubik } from "next/font/google";

const RubikText = Rubik({
	variable: "--font-rubik",
	subsets: ["latin", "cyrillic"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	authors: { name: "_swuttik_", url: "https://github.com/Svat-dev" },
	creator: "_swuttik_",
};

export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="ru">
			<MainProvider>
				<body className={`${RubikText.variable} antialiased tw-min-h-screen`}>{children}</body>
			</MainProvider>
		</html>
	);
}
