"use client";

import { Pagination, PaginationContent } from "@/components/ui/common";

import { NotificationsContextProvider } from "@/components/providers/NotificationsContext";
import Image from "next/image";
import { useNotificationsContent } from "../hooks/useNotificationsContent";
import styles from "../styles/notifications.module.scss";
import { NotificationsFilters } from "./filters/NotificationsFiltersWrapper";
import { NotificationItem } from "./NotificationItem";
import { NotificationsLoading } from "./NotificationsLoading";

const NotificationsContent = () => {
	const { isNotificationsLoading, notifications, notificationsLength, updateQueryParams, queryParams, unReadLength, t } =
		useNotificationsContent();

	const limit = 6;
	const pages = Math.ceil(notificationsLength! / limit);

	return (
		<NotificationsContextProvider>
			<NotificationsFilters unReadLength={unReadLength || 0} />

			<section className={styles["items-wrapper"]}>
				{isNotificationsLoading ? (
					<NotificationsLoading limit={limit} />
				) : notifications && notifications.length > 0 ? (
					<>
						{notifications?.map(item => (
							<NotificationItem key={item.id} {...item} />
						))}
					</>
				) : (
					<div className={styles["not-found"]}>
						<Image src="/assets/not-found-notifications.webp" alt={t("labels.notFoundImage")} width={250} height={155} loading="lazy" />
						<p>{t.rich("notFound", { br: () => <br /> })}</p>
					</div>
				)}

				<div className={styles["pagination-wrapper"]}>
					<Pagination className={[0, 1].includes(pages) && !isNotificationsLoading ? "hidden" : ""}>
						<PaginationContent
							pages={pages}
							currentPage={queryParams.page ? +queryParams.page : undefined}
							onChangePage={page => updateQueryParams("page", String(page))}
							isLoading={typeof notificationsLength !== "number" && isNotificationsLoading}
							maxPages={limit}
							arrows
						/>
					</Pagination>
				</div>
			</section>
		</NotificationsContextProvider>
	);
};

export { NotificationsContent };
