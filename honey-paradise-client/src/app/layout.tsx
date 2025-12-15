import "./main.scss";

import { getLocale, getMessages } from "next-intl/server";

import { ClientMainProvider } from "@/components/providers/ClientMainProvider";
import { MainProvider } from "@/components/providers/MainProvider";
import { EnumStorageKeys } from "@constants/base";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Rubik } from "next/font/google";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

interface IMainLayout {
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

export default async function MainLayout({ children }: Readonly<IMainLayout>) {
	const locale = await getLocale();

	const langs = await getMessages();

	const cookie = await cookies();

	const isAgreedWithCookie = cookie.get(EnumStorageKeys.IS_AGREE_WITH_COOKIES)?.value;
	const session = cookie.get(EnumStorageKeys.SESSION)?.value ? true : false;

	return (
		<html lang={locale}>
			<MainProvider>
				<body className={`${RubikText.variable} antialiased`}>
					<NextIntlClientProvider messages={langs}>
						<ClientMainProvider cookie={isAgreedWithCookie} session={session}>
							{children}
						</ClientMainProvider>
					</NextIntlClientProvider>
				</body>
			</MainProvider>
		</html>
	);
}
