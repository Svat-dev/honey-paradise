"use client";

import * as React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { DayPicker } from "react-day-picker";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@utils/base";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("tw-p-3 tw-bg-secondary tw-rounded-md", className)}
			classNames={{
				months: "tw-flex tw-flex-col sm:tw-flex-row tw-space-y-4 sm:tw-space-x-4 sm:tw-space-y-0",
				month: "tw-space-y-3",
				caption: "tw-flex tw-justify-center tw-pt-1 tw-relative tw-items-center",
				caption_label: "tw-text-sm tw-font-medium",
				nav: "tw-flex tw-items-center",
				nav_button: cn("tw-h-7 tw-w-7 tw-bg-transparent tw-p-0 tw-opacity-50 hover:tw-opacity-100"),
				nav_button_previous: "tw-absolute tw-left-1",
				nav_button_next: "tw-absolute tw-right-1",
				table: "tw-w-full tw-border-collapse tw-space-y-1",
				head_row: "tw-flex",
				head_cell: "tw-text-muted tw-rounded-md tw-w-8 tw-font-normal tw-text-[0.8rem]",
				row: "tw-flex tw-w-full tw-mt-2",
				cell: cn(
					"tw-relative tw-p-0 tw-text-center tw-text-sm focus-within:tw-relative focus-within:tw-z-20 [&:has([aria-selected])]:tw-bg-primary [&:has([aria-selected].day-outside)]:tw-bg-primary/50 [&:has([aria-selected].day-range-end)]:tw-rounded-r-md",
					props.mode === "range"
						? "[&:has(>.day-range-end)]:tw-rounded-r-md [&:has(>.day-range-start)]:tw-rounded-l-md first:[&:has([aria-selected])]:tw-rounded-l-md last:[&:has([aria-selected])]:tw-rounded-r-md"
						: "[&:has([aria-selected])]:tw-rounded-md"
				),
				day: cn(buttonVariants({ variant: "ghost" }), "tw-h-8 tw-w-8 tw-p-0 tw-font-normal hover:tw-bg-primary/20"),
				day_range_start: "tw-day-range-start",
				day_range_end: "tw-day-range-end",
				day_selected: "tw-bg-primary tw-text-black hover:tw-bg-primary-foreground hover:tw-text-primary-foreground",
				day_today: "tw-bg-secondary-foreground !tw-text-primary",
				day_outside: "tw-day-outside tw-text-black/50 aria-selected:tw-bg-accent/50 aria-selected:tw-text-muted-foreground",
				day_disabled: "tw-opacity-50 tw-bg-black/10",
				day_range_middle: "aria-selected:tw-bg-accent aria-selected:tw-text-accent-foreground",
				day_hidden: "tw-invisible",
				...classNames,
			}}
			components={{
				IconLeft: ({ className, ...props }) => <ChevronLeft size={24} className={className} {...props} />,
				IconRight: ({ className, ...props }) => <ChevronRight size={24} className={className} {...props} />,
			}}
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
