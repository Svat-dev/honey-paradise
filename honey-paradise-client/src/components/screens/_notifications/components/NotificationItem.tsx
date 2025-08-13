import { Button, Title } from "@/components/ui/common";
import { DotIcon, MoreVerticalIcon } from "lucide-react";

import { getNotificationHeadingByType } from "@/shared/lib/utils/get-notification-heading-by-type";
import { getTimeAsWordString } from "@/shared/lib/utils/get-time-as-word";
import type { INotificationUser } from "@/shared/types/models";
import { useTranslations } from "next-intl";
import { useState, type FC } from "react";

interface INotificationItem extends Partial<INotificationUser> {}

const NotificationItem: FC<INotificationItem> = ({ id, isRead, message, type, createdAt }) => {
	const dt = useTranslations("shared.time");
	const [time, setTime] = useState<string>(getTimeAsWordString(createdAt!));
	const title = getNotificationHeadingByType(type!);

	setInterval(() => {
		setTime(getTimeAsWordString(createdAt!, dt));
	}, 1000 * 60 * 3);

	return (
		<article className="tw-flex tw-items-center tw-justify-between tw-bg-primary tw-rounded-md tw-px-3 tw-py-2 tw-opacity-0 tw-animate-show-effect">
			<div>
				<div className="tw-flex tw-items-center tw-gap-1">
					<Title size="sm">{title}</Title>
					<DotIcon size={24} />
					<p className="tw-text-muted tw-text-sm">{time}</p>
				</div>

				<p className="tw-text-muted tw-ml-1">{message}</p>
			</div>

			<Button variant="ghost" className="[&_>_svg]:hover:tw-text-muted">
				<MoreVerticalIcon size={24} className="tw-transition-colors" />
			</Button>
		</article>
	);
};

export { NotificationItem };
