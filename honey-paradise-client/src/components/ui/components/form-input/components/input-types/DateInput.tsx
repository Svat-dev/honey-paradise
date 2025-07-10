import { Button, Calendar, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/common";
import { CalendarIcon, LoaderCircleIcon } from "lucide-react";

import { cn } from "@utils/base";
import { format } from "date-fns";
import type { FC } from "react";
import type { Options } from "vanilla-calendar-pro";
import { useFormDateInput } from "../../hooks/useFormDateInput";
import type { TFieldNames } from "../../types/form-input.type";

interface IProps {
	name: TFieldNames;
	config?: Options;
	isLoading?: boolean;
}

const DateInput: FC<IProps> = ({ name, isLoading, config }) => {
	const { fnsLocale, calendarLocale, isOpen, setDate, setIsOpen, date, t } = useFormDateInput(name);

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					className={cn("tw-items-center tw-gap-2 tw-ml-3 tw-px-2 tw-py-1", { "tw-text-muted": !date })}
					title={t("labels.birthdate")}
					disabled={isLoading}
				>
					<CalendarIcon size={26} />
					{isLoading ? (
						<LoaderCircleIcon size={20} className="tw-animate-spin" />
					) : (
						<span className="tw-opacity-0 tw-animate-show-effect">
							{date ? format(date, "PPP", { locale: fnsLocale }) : t("optional_part.form.birthdate.label")}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent side="top" className="!tw-bg-secondary">
				<Calendar
					config={{
						locale: calendarLocale,
						type: "default",
						dateMax: new Date(),
						dateMin: new Date("1900-01-01"),
						selectedDates: date ? [date] : [],
						onClickDate: setDate,
						...config,
					}}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { DateInput };
