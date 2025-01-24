import type { ReactNode } from "react";
import type { Viewport } from "next";
import { getViewport } from "@utils/base";

export const viewport: Viewport = getViewport(false, 1);

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return children;
}
