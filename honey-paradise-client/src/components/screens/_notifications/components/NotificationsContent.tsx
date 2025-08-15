"use client";

import { Pagination, PaginationContent } from "@/components/ui/common";

import Image from "next/image";
import { useNotificationsContent } from "../hooks/useNotificationsContent";
import styles from "../styles/notifications.module.scss";
import { NotificationItem } from "./NotificationItem";
import { NotificationsFilters } from "./NotificationsFilters";
import { NotificationsLoading } from "./NotificationsLoading";

const NotificationsContent = () => {
	const { isNotificationsLoading, notifications, notificationsLength, updateQueryParams, queryParams, unReadLength } =
		useNotificationsContent();

	return (
		<>
			<NotificationsFilters unReadLength={unReadLength || 0} />

			<section className={styles["items-wrapper"]}>
				{isNotificationsLoading ? (
					<NotificationsLoading limit={5} />
				) : notifications && notifications.length > 0 ? (
					<>
						{notifications?.map(item => (
							<NotificationItem key={item.id} {...item} />
						))}
					</>
				) : (
					<div className={styles["not-found"]}>
						<Image src="/assets/not-found-notifications.webp" alt={"Фото: Не найдено"} width={250} height={155} />
						<p>
							Ваши уведомления не найдены или их просто нет
							<br />
							Когда придут первые уведомления, они здесь появятся
						</p>
					</div>
				)}

				<div className={styles["pagination-wrapper"]}>
					<Pagination>
						<PaginationContent
							pages={Math.ceil(notificationsLength! / 5)}
							currentPage={queryParams.page ? +queryParams.page : undefined}
							onChangePage={page => updateQueryParams("page", String(page))}
							isLoading={typeof notificationsLength !== "number" && isNotificationsLoading}
							maxPages={5}
							arrows
						/>
					</Pagination>
				</div>
			</section>
		</>
	);
};

export { NotificationsContent };
