import { ArrowDownToLineIcon, ChevronDownIcon } from "lucide-react"
import type { FC } from "react"

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/common"
import { cn } from "@/shared/lib/utils/base"

import { useDownloadSettings } from "../../../hooks/useDownloadSettings"

interface IProps {
	isLoading: boolean
}

const DownloadSettings: FC<IProps> = ({ isLoading }) => {
	const { isOpen, setIsOpen, data, t } = useDownloadSettings()

	return (
		<div>
			<div>
				<p>{t("actions.saveFile.title")}</p>
				<p>{t("actions.saveFile.description")}</p>
			</div>

			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="default"
						className="items-center gap-2 px-2 py-1.5"
						title={t("labels.saveFileBtn")}
						disabled={isLoading}
					>
						<span>{t("actions.saveFile.btn")}</span>
						<ChevronDownIcon
							size={24}
							className={cn("transition-transform will-change-transform", {
								"rotate-180": isOpen
							})}
						/>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					{data.map(({ title, label, fn }) => (
						<DropdownMenuItem key={title} asChild>
							<Button
								variant="ghost"
								onClick={() => fn()}
								className="w-full !justify-start gap-1 px-2 py-2 hover:!bg-muted/20"
								title={label}
							>
								<ArrowDownToLineIcon size={20} />
								{title}
							</Button>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export { DownloadSettings }
