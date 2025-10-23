import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/common";

import type { ICNProps } from "@/shared/types";
import { cn } from "@utils/base";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

interface INotificationsDMItem extends ICNProps {
	Icon: LucideIcon;
	text: string;
	disabled?: boolean;
	onClick?: Function;
	shortcut?: string;
}

const NotificationsDMItem: FC<INotificationsDMItem> = ({ Icon, text, shortcut, onClick, disabled, className }) => {
	return (
		<DropdownMenuItem className={cn("hover:text-muted transition-colors", className)} onClick={() => onClick?.()} disabled={disabled}>
			<Icon size={24} />
			{text}
			{shortcut && <DropdownMenuShortcut className="pl-2">{shortcut}</DropdownMenuShortcut>}
		</DropdownMenuItem>
	);
};

export { NotificationsDMItem };
