import { m, MotionProps } from "motion/react"
import {
	forwardRef,
	type HTMLAttributes,
	type TdHTMLAttributes,
	type ThHTMLAttributes
} from "react"

import { cn } from "@/shared/lib/utils/base"

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
	({ className, ...props }, ref) => (
		<div className="relative w-full overflow-auto">
			<table
				ref={ref}
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	)
)
Table.displayName = "Table"

const TableHeader = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead
		ref={ref}
		className={cn("border-muted/30 [&_tr]:border-b", className)}
		{...props}
	/>
))
TableHeader.displayName = "TableHeader"

const TableBody = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn("border-muted/30 [&_tr:last-child]:border-0", className)}
		{...props}
	/>
))
TableBody.displayName = "TableBody"

const TableFooter = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot
		ref={ref}
		className={cn(
			"border-t border-muted/30 bg-muted/50 font-medium [&>tr]:last:border-b-0",
			className
		)}
		{...props}
	/>
))
TableFooter.displayName = "TableFooter"

const TableRow = forwardRef<
	HTMLTableRowElement,
	HTMLAttributes<HTMLTableRowElement> & MotionProps
>(({ className, ...props }, ref) => (
	<m.tr
		ref={ref}
		initial={false}
		className={cn(
			"border-b border-muted/30 transition-colors hover:bg-muted/10 data-[state=selected]:bg-muted",
			className
		)}
		{...props}
	/>
))
TableRow.displayName = "TableRow"

const TableHead = forwardRef<
	HTMLTableCellElement,
	ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			"h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
			className
		)}
		{...props}
	/>
))
TableHead.displayName = "TableHead"

const TableCell = forwardRef<
	HTMLTableCellElement,
	TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn(
			"px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0",
			className
		)}
		{...props}
	/>
))
TableCell.displayName = "TableCell"

const TableCaption = forwardRef<
	HTMLTableCaptionElement,
	HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption ref={ref} className={cn("mt-4 text-sm", className)} {...props} />
))
TableCaption.displayName = "TableCaption"

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
}
