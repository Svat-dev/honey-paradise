import { Header } from "@/components/layouts/-header/Header";
import { Container } from "@/components/ui/layouts";
import { getViewport } from "@utils/base";
import type { Viewport } from "next";
import type { ReactNode } from "react";

export const viewport: Viewport = getViewport(false, 1);

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<Header />
			<main>
				<Container>{children}</Container>
			</main>
		</>
	);
}
