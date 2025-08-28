"use client";

import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import type { IPaginationContentProps, IPaginationItemProps, IPaginationProps } from "./types/pagination.type";

import { Button, Separator, Skeleton } from "@/components/ui/common";
import { cn } from "@utils/base";
import { getPaginationSchema } from "@utils/ui";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Pagination: FC<PropsWithChildren<IPaginationProps>> = ({ children, className, ...props }) => {
	return (
		<div className={cn("tw-flex tw-items-center tw-gap-3", className)} role="navigation" aria-label="pagination" {...props}>
			{children}
		</div>
	);
};

const PaginationItem: FC<PropsWithChildren<IPaginationItemProps>> = ({ children, isActive, isArrow, className, ...props }) => (
	<Button variant={isActive ? "secondary" : "default"} className={cn(isArrow ? "tw-p-1" : "tw-py-2 tw-px-3.5", className)} {...props}>
		{children}
	</Button>
);

const PaginationContent: FC<IPaginationContentProps> = ({
	arrows,
	currentPage,
	onChangePage,
	infinite,
	pages,
	isLoading,
	maxPages = 10,
}) => {
	const [page, setPage] = useState<number>(typeof currentPage === "number" ? currentPage : 1);

	const activeArrows = {
		prev: arrows === "prev" || arrows === true,
		next: arrows === "next" || arrows === true,
	};

	const disabledArrows = {
		prev: (!infinite && page === 1) || isLoading,
		next: (!infinite && page === pages) || isLoading,
	};

	const schema = getPaginationSchema(pages, maxPages, page);

	const onInfiniteChange = (fn: (page: number) => void, newPage: number) => {
		if (infinite) {
			if (newPage > pages) return fn(1);
			else if (newPage < 1) return fn(pages);
			else return fn(newPage);
		} else return fn(newPage);
	};

	const setCurrentPage = (newPage: number) => {
		if (typeof onChangePage !== "undefined") onInfiniteChange(onChangePage, newPage);
		else onInfiniteChange(setPage, newPage);
	};

	useEffect(() => {
		if (typeof currentPage === "number") setPage(currentPage);
	}, [currentPage]);

	return (
		<>
			{activeArrows.prev && (
				<>
					<PaginationItem onClick={() => setCurrentPage(page - 1)} disabled={disabledArrows.prev} isArrow>
						<ChevronLeftIcon size={24} />
					</PaginationItem>
					<Separator orientation="vertical" className="tw-bg-muted !tw-h-6 tw-mx-1" />
				</>
			)}

			{isLoading ? (
				<>
					<Skeleton className="tw-w-9 tw-h-9" />
					<Skeleton className="tw-w-9 tw-h-9" />
					<Skeleton className="tw-w-9 tw-h-9" />
				</>
			) : (
				schema.map((item, i) =>
					item === "..." ? (
						<PaginationItem key={i} className="!tw-bg-primary/30 tw-shadow-xl tw-pointer-events-none" role="separator">
							{item}
						</PaginationItem>
					) : (
						<PaginationItem key={i} title={`Страница ${item}`} onClick={() => setCurrentPage(+item)} isActive={+item === page}>
							{item}
						</PaginationItem>
					)
				)
			)}

			{activeArrows.next && (
				<>
					<Separator orientation="vertical" className="tw-bg-muted !tw-h-6 tw-mx-1" />
					<PaginationItem onClick={() => setCurrentPage(page + 1)} disabled={disabledArrows.next} isArrow>
						<ChevronRightIcon size={24} />
					</PaginationItem>
				</>
			)}
		</>
	);
};

export { Pagination, PaginationContent };
