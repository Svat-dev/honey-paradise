import { type ICNProps } from "@/shared/types/base.type";
import { type PropsWithChildren } from "react";

type TypeTitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type TypeProps = {
	size?: TypeTitleSize;
	className?: string;
} & PropsWithChildren &
	ICNProps;
