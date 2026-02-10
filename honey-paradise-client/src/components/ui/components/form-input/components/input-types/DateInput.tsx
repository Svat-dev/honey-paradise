import { cn } from "@utils/base"
import { format } from "date-fns"
import { CalendarIcon, LoaderCircleIcon } from "lucide-react"
import type { FC } from "react"
import type { Options } from "vanilla-calendar-pro"

import {
	Button,
	Calendar,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/ui/common"

import { useFormDateInput } from "../../hooks/useFormDateInput"
import type { TFieldNames } from "../../types/form-input.type"

interface IProps {
	name: TFieldNames
	config?: Options
	isLoading?: boolean
}

const DateInput: FC<IProps> = ({ name, isLoading, config }) => {
	const { fnsLocale, calendarLocale, isOpen, setDate, setIsOpen, date, t } =
		useFormDateInput(name)

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					className={cn("ml-3 items-center gap-2 px-2 py-1", {
						"text-muted": !date
					})}
					title={t("labels.birthdate")}
					disabled={isLoading}
				>
					<CalendarIcon size={26} />
					{isLoading ? (
						<LoaderCircleIcon size={20} className="animate-spin" />
					) : (
						<span className="animate-show-effect opacity-0">
							{date
								? format(date, "PPP", { locale: fnsLocale })
								: t("optional_part.form.birthdate.label")}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent side="top" className="!bg-secondary">
				<Calendar
					config={{
						locale: calendarLocale,
						type: "default",
						dateMax: new Date(),
						dateMin: new Date("1900-01-01"),
						selectedDates: date ? [date] : [],
						onClickDate: setDate,
						...config
					}}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { DateInput }
