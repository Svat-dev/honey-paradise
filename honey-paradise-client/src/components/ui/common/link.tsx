"use client";

import { cn } from "@utils/base";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/dist/client/link";
import type { TLinkType } from "./types/link.type";

const LinkUI: TLinkType = ({ href, children, className, asAnchor, asChild, isOutside, ...props }) => {
	const newHref = asAnchor ? `#${href}` : href;

	return (
		<Link href={newHref} className={cn("tw-inline-flex", className)} {...props}>
			{children}
			{isOutside && (
				<span className="tw-inline-flex">
					<ArrowUpRightIcon size={14} className="" />
				</span>
			)}
		</Link>
	);
};

export { LinkUI as Link };
