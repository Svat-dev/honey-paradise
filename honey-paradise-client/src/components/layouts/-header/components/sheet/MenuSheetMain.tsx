"use client";

import { Loader2Icon } from "lucide-react";
import Link from "next/dist/client/link";
import { useMenuSheetMain } from "../../hooks/useMenuSheetMain";

const MenuSheetMain = () => {
	const { data, unReadLength, isNotificationsLoading } = useMenuSheetMain();
	console.log(unReadLength);

	return (
		<ul className="tw-list-none tw-flex tw-flex-col tw-items-end tw-mt-5">
			{data.map(item => (
				<li className="tw-mt-3 tw-relative tw-transition-all hover:-tw-translate-x-2 hover:tw-text-muted" key={item.title}>
					<Link href={item.link} className="tw-flex tw-items-center tw-gap-1.5">
						<p>{item.title}</p>
						<item.icon />
					</Link>

					{item.isNotifications && (
						<div className="tw-absolute -tw-top-1 -tw-right-1 tw-w-4 tw-h-4 tw-flex tw-items-center tw-justify-center tw-bg-secondary tw-p-0.5 tw-rounded-full tw-text-xs">
							{isNotificationsLoading ? (
								<Loader2Icon className="tw-animate-spin" size={16} />
							) : (
								<span className="!tw-text-black">{unReadLength! > 9 ? "9+" : unReadLength}</span>
							)}
						</div>
					)}
				</li>
			))}
		</ul>
	);
};

export { MenuSheetMain };
