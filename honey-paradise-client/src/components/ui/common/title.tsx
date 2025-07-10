import { cn } from "@utils/base/cn";
import { createElement, type FC } from "react";
import type { TypeProps } from "./types/title.type";

const Title: FC<TypeProps> = ({ children, size = "sm", className }: TypeProps) => {
	const mapTagBySize = {
		xs: "h5",
		sm: "h4",
		md: "h3",
		lg: "h2",
		xl: "h1",
		"2xl": "h1",
	} as const;

	const mapClassNameBySize = {
		xs: "tw-text-[16px]",
		sm: "tw-text-[20px]",
		md: "tw-text-[22px]",
		lg: "tw-text-[26px]",
		xl: "tw-text-[35px]",
		"2xl": "tw-text-[48px]",
	} as const;

	return createElement(mapTagBySize[size], { className: cn(mapClassNameBySize[size], className) }, children);
};

export { Title };
