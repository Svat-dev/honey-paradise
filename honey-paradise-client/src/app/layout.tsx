import "./main.scss";

import { getLocale, getMessages } from "next-intl/server";

import { MainProvider } from "@/components/providers/MainProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Rubik } from "next/font/google";
import type { ReactNode } from "react";

interface IMainLayout {
	params: {};
	children: ReactNode;
}

const RubikText = Rubik({
	variable: "--font-rubik",
	subsets: ["latin", "cyrillic"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	authors: { name: "_swuttik_", url: "https://github.com/Svat-dev" },
	creator: "_swuttik_",
};

export default async function MainLayout({ children, params }: Readonly<IMainLayout>) {
	const locale = await getLocale();

	const langs = await getMessages();

	return (
		<html lang={locale}>
			<MainProvider>
				<body className={`${RubikText.variable} antialiased tw-min-h-screen`}>
					<NextIntlClientProvider messages={langs}>{children}</NextIntlClientProvider>
				</body>
			</MainProvider>
		</html>
	);
}
