import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/common";
import { CheckIcon, ChevronDownIcon, LoaderCircleIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/base";
import type { FC } from "react";
import { useDropdownInput } from "../../hooks/useDropdownInput";
import type { IDropdownInputProps } from "../../types/form-input.type";

const DropdownInput: FC<IDropdownInputProps> = ({ name, data, align, isLoading, ...props }) => {
	const { value, onChange, isOpen, setIsOpen, label } = useDropdownInput(name);

	if (!data) return null;

	const current = data.find(item => item.value === value);

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" className="gap-1 px-2 py-1 mb-1" title={props.title} disabled={isLoading}>
					{isLoading ? (
						<LoaderCircleIcon size={20} className="animate-spin" />
					) : (
						<p className="opacity-0 animate-show-effect">{label(current) || value}</p>
					)}
					<ChevronDownIcon size={22} className={cn("transition-transform", { "rotate-180": isOpen })} />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align={align}>
				{data.map(item => (
					<DropdownMenuItem
						className="w-full justify-between py-2 transition-colors hover:text-muted"
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
