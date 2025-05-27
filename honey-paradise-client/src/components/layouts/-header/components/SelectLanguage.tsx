"use client";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@utils/base";
import { useState } from "react";
import { useAvailableLangs } from "../hooks/useAvailableLangs";

const SelectLanguage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { data, t, currentLangText } = useAvailableLangs();

	return (
		<DropdownMenu open={isOpen} onOpenChange={status => setIsOpen(status)}>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" className="tw-px-1 tw-py-0.5 tw-mb-1">
					<p>{currentLangText}</p>
					<ChevronDownIcon className={cn("tw-transition-transform", { "tw-rotate-180": isOpen })} />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="">
				<DropdownMenuLabel className="tw-sr-only">Выберите язык</DropdownMenuLabel>

				{data?.map(item => (
					<DropdownMenuItem
						className="tw-py-2 tw-transition-colors hover:tw-text-muted"
						title={item.isCurrent ? t("labels.currentLang") : ""}
						key={item.value}
					>
						{item.language}&nbsp;({item.value}){item.isCurrent && <CheckIcon className="tw-absolute tw-right-1" size={20} />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { SelectLanguage };
