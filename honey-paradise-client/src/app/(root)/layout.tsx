import { Header } from "@/components/layouts/-header/Header";
import { RootSidebar } from "@/components/layouts/-root-sidebar/RootSidebar";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { getViewport } from "@utils/base";
import type { Viewport } from "next/dist/lib/metadata/types/metadata-interface";
import type { ReactNode } from "react";

export const viewport: Viewport = getViewport(false, 1);

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<Header route={EnumAppRoute.INDEX} />
			<main className="tw-flex tw-relative tw-h-full">
				<RootSidebar />
				{children}
			</main>
		</>
	);
}
