"use client";

import { Pagination, PaginationContent } from "@/components/ui/common";

import Image from "next/image";
import { useNotificationsContent } from "../hooks/useNotificationsContent";
import { NotificationItem } from "./NotificationItem";
import { NotificationsFilters } from "./NotificationsFilters";
import { NotificationsLoading } from "./NotificationsLoading";

const NotificationsContent = () => {
	const { isNotificationsLoading, notifications, notificationsLength, updateQueryParams, queryParams } = useNotificationsContent();

	return (
		<>
			<NotificationsFilters />

			<section className="tw-flex tw-flex-col tw-gap-4 tw-mb-16 tw-pr-3 tw-max-h-[29rem] tw-overflow-y-scroll">
				{isNotificationsLoading ? (
					<NotificationsLoading limit={5} />
				) : notifications && notifications.length > 0 ? (
					<>
						{notifications?.map(item => (
							<NotificationItem key={item.id} {...item} />
						))}
					</>
				) : (
					<div className="tw-flex tw-items-center tw-gap-5 tw-rounded-md tw-w-fit tw-mt-5 tw-opacity-0 tw-animate-show-effect tw-self-center">
						<Image src="/assets/not-found-notifications.webp" alt={"Not found"} width={250} height={155} />
						<p className="tw-leading-7">
							Ваши уведомления не найдены или их просто нет
							<br />
							Когда придут первые уведомления, они здесь появятся
						</p>
					</div>
				)}

				<div className="tw-absolute -tw-bottom-6 tw-pb-7 tw-w-full tw-bg-background tw-flex tw-justify-center tw-opacity-0 tw-animate-show-effect">
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
