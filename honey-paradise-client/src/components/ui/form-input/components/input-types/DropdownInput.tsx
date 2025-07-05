import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui";
import { CheckIcon, ChevronDownIcon, LoaderCircleIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/base";
import type { FC } from "react";
import { useDropdownInput } from "../../hooks/useDropdownInput";
import type { IDropdownInputProps } from "../../types/form-input.type";

const DropdownInput: FC<IDropdownInputProps> = ({ name, data, isLoading, ...props }) => {
	const { value, onChange, isOpen, setIsOpen, label } = useDropdownInput(name);

	if (!data) return null;

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" className="tw-gap-1 tw-px-2 tw-py-1 tw-mb-1" title={props.title} disabled={isLoading}>
					{isLoading ? (
						<LoaderCircleIcon size={20} className="tw-animate-spin" />
					) : (
						<p className="tw-opacity-0 tw-animate-show-effect">{label}</p>
					)}
					<ChevronDownIcon size={22} className={cn("tw-transition-transform", { "tw-rotate-180": isOpen })} />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				{data.map(item => (
					<DropdownMenuItem
						className="tw-w-full tw-justify-between tw-py-2 tw-transition-colors hover:tw-text-muted"
						onClick={() => onChange(item.value)}
						key={item.id}
					>
						<span>{item.label}</span>
						{item.value === value && <CheckIcon size={32} />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { DropdownInput };
