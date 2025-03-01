import { Header } from "@/components/layouts/-header/Header";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/layouts/-sidebar/Sidebar";
import type { Viewport } from "next";
import { getViewport } from "@utils/base";

export const viewport: Viewport = getViewport(false, 1);

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<Header />
			<main className="tw-flex tw-relative tw-h-full">
				<Sidebar />
				{children}
			</main>
		</>
	);
}
