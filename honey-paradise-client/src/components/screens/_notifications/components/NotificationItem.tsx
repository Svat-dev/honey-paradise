import { DotIcon } from "lucide-react";
import type { FC } from "react";
import type { GetMyNotificationResponse } from "@/shared/types/server";
import { Title } from "@/components/ui/common";
import { cn } from "@utils/base";
import dynamic from "next/dynamic";
import styles from "../styles/notifications.module.scss";
import { useNotificationItem } from "../hooks/useNotificationItem";

const DynamicNotificationsItemDM = dynamic(() => import("./dropdown/NotificationsDM").then(mod => mod.NotificationsItemDM));

interface INotificationItem extends Partial<GetMyNotificationResponse> {}

const NotificationItem: FC<INotificationItem> = ({ id, isRead, message, type, createdAt }) => {
	const { onContextMenu, title, time, isOpen, setIsOpen, isSelected, isSelectMode, onClick, onMouseEnter, onMouseLeave, t } =
		useNotificationItem(id, type, !!isRead, createdAt);

	return (
		<article
			className={styles["item"]}
			data-selected={isSelected}
			data-select-mode={isSelectMode}
			onClick={onClick}
			onContextMenu={onContextMenu}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className={styles["item-overlay"]} role="none" />

			<div className={styles["item-content-wrapper"]}>
				<div className={cn({ "tw-italic": !isRead })}>
					<Title size="sm">{title}</Title>

					<DotIcon size={24} />

					<p>{time}</p>

					<DotIcon size={24} />

					<span>{t("isRead", { isRead: String(isRead) })}</span>
				</div>

				<p>{message}</p>
			</div>

			<DynamicNotificationsItemDM nid={id} isRead={isRead} isOpen={isOpen} setIsOpen={setIsOpen} />
		</article>
	);
};

export { NotificationItem };
