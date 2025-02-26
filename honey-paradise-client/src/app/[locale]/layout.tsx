import "./main.scss";

import { MainProvider } from "@/components/providers/MainProvider";
import { routing } from "@i18n/index";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/dist/client/components/navigation.react-server";
import { Rubik } from "next/font/google";
import type { ReactNode } from "react";

interface IMainLayout {
	params: { locale: string };
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
	const { locale } = await params;

	if (!routing.locales.includes(locale as any)) notFound();

	const langs = await getMessages();

	return (
		<html lang="ru">
			<MainProvider>
				<body className={`${RubikText.variable} antialiased tw-min-h-screen`}>
					<NextIntlClientProvider messages={langs}>{children}</NextIntlClientProvider>
				</body>
			</MainProvider>
		</html>
	);
}
