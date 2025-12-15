import type { ICNProps } from "@/shared/types/base.type";
import type { PropsWithChildren } from "react";

export type TypeTitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type TypeProps = {
	id?: string;
	size?: TypeTitleSize;
	className?: string;
} & PropsWithChildren &
	ICNProps;
