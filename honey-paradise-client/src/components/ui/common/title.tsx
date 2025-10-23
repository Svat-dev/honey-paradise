import { cn } from "@utils/base/cn";
import { createElement, type FC } from "react";
import type { TypeProps } from "./types/title.type";

const Title: FC<TypeProps> = ({ id, children, size = "sm", className }) => {
	const mapTagBySize = {
		xs: "h5",
		sm: "h4",
		md: "h3",
		lg: "h2",
		xl: "h1",
		"2xl": "h1",
	} as const;

	const mapClassNameBySize = {
		xs: "text-[16px]",
		sm: "text-[20px]",
		md: "text-[22px]",
		lg: "text-[26px]",
		xl: "text-[35px]",
		"2xl": "text-[48px]",
	} as const;

	return createElement(mapTagBySize[size], { className: cn(mapClassNameBySize[size], className), id }, children);
};

export { Title };
