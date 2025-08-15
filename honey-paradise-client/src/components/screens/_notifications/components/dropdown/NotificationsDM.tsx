import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Separator,
} from "@/components/ui/common";

import type { ReactStateHook } from "@/shared/types";
import { MoreVerticalIcon } from "lucide-react";
import type { FC } from "react";
import { useNotificationsDM } from "../../hooks/useNotificationsDM";
import { NotificationsDMItem } from "./NotificationsDMItem";

interface IProps {
	nid: string | undefined;
	isRead: boolean | undefined;
	isOpen: boolean;
	setIsOpen: ReactStateHook<boolean>;
}

const NotificationsItemDM: FC<IProps> = ({ nid, isRead, isOpen, setIsOpen }) => {
	const { data } = useNotificationsDM(nid!, !!isRead, isOpen);

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="[&_>_svg]:hover:tw-text-muted">
					<MoreVerticalIcon size={24} className="tw-transition-colors" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent side="left">
				<DropdownMenuLabel className="tw-sr-only">{"Действия"}</DropdownMenuLabel>

				<DropdownMenuGroup>{data.map(item => !item.delete && <NotificationsDMItem key={item.text} {...item} />)}</DropdownMenuGroup>

				<Separator orientation="horizontal" className="tw-w-full !tw-bg-muted/30" />

				<DropdownMenuGroup>
					{data
						.filter(item => item.delete)
						.map(item => (
							<NotificationsDMItem key={item.text} className="tw-text-red-500" {...item} />
						))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { NotificationsItemDM };
