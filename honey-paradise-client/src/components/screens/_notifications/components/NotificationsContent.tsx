"use client"

import { NotificationsContextProvider } from "@/components/providers/NotificationsContext"
import { Pagination, PaginationContent } from "@/components/ui/common"

import { useNotificationsContent } from "../hooks/useNotificationsContent"
import styles from "../styles/notifications.module.scss"

import { NotificationsFilters } from "./filters/NotificationsFiltersWrapper"
import { NotificationEmpty } from "./NotificationEmpty"
import { NotificationItem } from "./NotificationItem"
import { NotificationsLoading } from "./NotificationsLoading"

const NotificationsContent = () => {
	const {
		isNotificationsLoading,
		notifications,
		notificationsLength,
		updateQueryParams,
		queryParams,
		unReadLength
	} = useNotificationsContent()

	const limit = 6
	const pages = Math.ceil(notificationsLength! / limit)

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
					<NotificationEmpty />
				)}

				<div className={styles["pagination-wrapper"]}>
					<Pagination
						className={
							[0, 1].includes(pages) && !isNotificationsLoading ? "hidden" : ""
						}
					>
						<PaginationContent
							pages={pages}
							currentPage={queryParams.page ? +queryParams.page : undefined}
							onChangePage={page => updateQueryParams("page", String(page))}
							isLoading={
								typeof notificationsLength !== "number" &&
								isNotificationsLoading
							}
							maxPages={limit}
							arrows
						/>
					</Pagination>
				</div>
			</section>
		</NotificationsContextProvider>
	)
}

export { NotificationsContent }
