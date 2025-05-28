import { Header } from "@/components/layouts/-header/Header";
import { Sidebar } from "@/components/layouts/-sidebar/Sidebar";
import { getViewport } from "@utils/base";
import type { Viewport } from "next";
import { type ReactNode } from "react";

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
