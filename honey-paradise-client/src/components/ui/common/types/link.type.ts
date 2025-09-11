import type { AnchorHTMLAttributes, FC, PropsWithChildren } from "react";

import type { LinkProps } from "next/link";

export interface ILinkProps extends LinkProps, PropsWithChildren {
	asChild?: boolean;
	asAnchor?: boolean;
	isOutside?: boolean;
}

export type TLinkType = FC<ILinkProps & AnchorHTMLAttributes<HTMLAnchorElement>>;
