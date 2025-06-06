import { Button, Calendar, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui";

import { CalendarIcon } from "lucide-react";
import type { FC } from "react";
import type { TFieldNames } from "../../types/form-input.type";
import { cn } from "@utils/base";
import { format } from "date-fns";
import { useFormDateInput } from "../../hooks/useFormDateInput";

interface IProps {
	name: TFieldNames;
}

const DateInput: FC<IProps> = ({ name }) => {
	const { fnsLocale, isOpen, setDate, setIsOpen, date } = useFormDateInput(name);

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" className={cn("tw-items-center tw-gap-2 tw-ml-3 tw-px-2 tw-py-1", { "tw-text-muted": !date })}>
					<CalendarIcon size={26} />
					<span>{date ? format(date, "PPP", { locale: fnsLocale }) : "Выберите дату"}</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					locale={fnsLocale}
					initialFocus
					disabled={date => date > new Date() || date < new Date("1900-01-01")}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { DateInput };
