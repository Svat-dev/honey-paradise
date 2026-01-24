"use client"

import { cn } from "@utils/base"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { type FC, type PropsWithChildren, useState } from "react"

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "@/components/ui/common"
import { useLanguage } from "@/shared/lib/i18n/hooks/useLanguage"

import { useAvailableLangs } from "../hooks/useAvailableLangs"

const SelectLanguageDM: FC<PropsWithChildren> = ({ children }) => {
	const { data, t, currentLangText } = useAvailableLangs()
	const { change } = useLanguage()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<DropdownMenu open={isOpen} onOpenChange={status => setIsOpen(status)}>
			<DropdownMenuTrigger asChild>
				{children ? (
					children
				) : (
					<Button variant="secondary" className="mb-1 px-1 py-0.5">
						<p>{currentLangText}</p>
						<ChevronDownIcon
							className={cn("transition-transform", { "rotate-180": isOpen })}
						/>
					</Button>
				)}
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuLabel className="sr-only">{t("title")}</DropdownMenuLabel>

				{data?.map(item => (
					<DropdownMenuItem
						className="py-2 transition-colors hover:text-muted"
						title={item.isCurrent ? t("labels.currentLang") : ""}
						onClick={() => change(item.value)}
						key={String(item.value)}
					>
						{item.language}&nbsp;({item.value.toUpperCase()})
						{item.isCurrent && (
							<CheckIcon className="absolute right-1" size={20} />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { SelectLanguageDM }
