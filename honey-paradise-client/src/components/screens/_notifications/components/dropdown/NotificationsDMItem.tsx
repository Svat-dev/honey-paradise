import { cn } from "@utils/base"
import type { LucideIcon } from "lucide-react"
import type { FC } from "react"

import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/common"
import type { ICNProps } from "@/shared/types"

interface INotificationsDMItem extends ICNProps {
	Icon: LucideIcon
	text: string
	disabled?: boolean
	onClick?: Function
	shortcut?: string
}

const NotificationsDMItem: FC<INotificationsDMItem> = ({
	Icon,
	text,
	shortcut,
	onClick,
	disabled,
	className
}) => {
	return (
		<DropdownMenuItem
			className={cn("transition-colors hover:text-muted", className)}
			onClick={() => onClick?.()}
			disabled={disabled}
		>
			<Icon size={24} />
			{text}
			{shortcut && (
				<DropdownMenuShortcut className="pl-2">{shortcut}</DropdownMenuShortcut>
			)}
		</DropdownMenuItem>
	)
}

export { NotificationsDMItem }
