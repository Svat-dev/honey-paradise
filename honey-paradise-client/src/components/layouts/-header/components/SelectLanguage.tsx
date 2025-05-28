"use client";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { useChangeLang } from "@i18n/hooks/useChangeLang";
import { cn } from "@utils/base";
import { useState } from "react";
import { useAvailableLangs } from "../hooks/useAvailableLangs";

const SelectLanguage = () => {
	const { data, t, currentLangText } = useAvailableLangs();
	const { change } = useChangeLang();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<DropdownMenu open={isOpen} onOpenChange={status => setIsOpen(status)}>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" className="tw-px-1 tw-py-0.5 tw-mb-1">
					<p>{currentLangText}</p>
					<ChevronDownIcon className={cn("tw-transition-transform", { "tw-rotate-180": isOpen })} />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuLabel className="tw-sr-only">{t("title")}</DropdownMenuLabel>

				{data?.map(item => (
					<DropdownMenuItem
						className="tw-py-2 tw-transition-colors hover:tw-text-muted"
						title={item.isCurrent ? t("labels.currentLang") : ""}
						onClick={() => change(item.value)}
						key={String(item.value)}
					>
						{item.language}&nbsp;({item.value.toUpperCase()}){item.isCurrent && <CheckIcon className="tw-absolute tw-right-1" size={20} />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { SelectLanguage };
