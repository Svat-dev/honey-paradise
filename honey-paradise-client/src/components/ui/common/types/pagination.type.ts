import type { HTMLAttributes } from "react";
import type { ButtonProps } from "../button";

export interface IPaginationProps extends HTMLAttributes<HTMLDivElement> {}

export interface IPaginationContentProps {
	pages: number;
	maxPages?: number;
	isLoading?: boolean;
	infinite?: boolean;
	arrows?: boolean | "prev" | "next";
	currentPage?: number;
	onChangePage?: (page: number) => void;
}

export interface IPaginationItemProps extends ButtonProps {
	isActive?: boolean;
	isArrow?: boolean;
}
