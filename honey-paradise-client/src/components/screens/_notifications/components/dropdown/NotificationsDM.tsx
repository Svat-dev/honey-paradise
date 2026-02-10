import { MoreVerticalIcon } from "lucide-react"
import type { FC } from "react"

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Separator
} from "@/components/ui/common"
import type { ReactStateHook } from "@/shared/types"

import { useNotificationsDM } from "../../hooks/useNotificationsDM"

import { NotificationsDMItem } from "./NotificationsDMItem"

interface IProps {
	nid: string | undefined
	isRead: boolean | undefined
	isOpen: boolean
	setIsOpen: ReactStateHook<boolean>
}

const NotificationsItemDM: FC<IProps> = ({
	nid,
	isRead,
	isOpen,
	setIsOpen
}) => {
	const { data, t } = useNotificationsDM(nid!, !!isRead, isOpen)

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					title={t("title")}
					className="[&_>_svg]:hover:text-muted"
				>
					<MoreVerticalIcon size={24} className="transition-colors" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent side="left">
				<DropdownMenuLabel className="sr-only">{t("title")}</DropdownMenuLabel>

				<DropdownMenuGroup>
					{data.map(
						item =>
							!item.delete && <NotificationsDMItem key={item.text} {...item} />
					)}
				</DropdownMenuGroup>

				<Separator orientation="horizontal" className="w-full !bg-muted/30" />

				<DropdownMenuGroup>
					{data
						.filter(item => item.delete)
						.map(item => (
							<NotificationsDMItem
								key={item.text}
								className="text-red-500"
								{...item}
							/>
						))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { NotificationsItemDM }
