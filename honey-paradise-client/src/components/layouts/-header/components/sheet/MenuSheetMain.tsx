"use client";

import { Link } from "@/components/ui/common";
import { Loader2Icon } from "lucide-react";
import { useMenuSheetMain } from "../../hooks/useMenuSheetMain";

const MenuSheetMain = () => {
	const { data, unReadLength, isNotificationsLoading } = useMenuSheetMain();

	return (
		<ul className="list-none flex flex-col items-end mt-5">
			{data.map(item => (
				<li className="mt-3 relative transition-all hover:-translate-x-2 hover:text-muted" key={item.title}>
					<Link href={item.link} className="flex items-center gap-1.5">
						<p>{item.title}</p>
						<item.icon />
					</Link>

					{item.isNotifications && (
						<div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-secondary p-0.5 rounded-full text-xs">
							{isNotificationsLoading ? (
								<Loader2Icon className="animate-spin" size={16} />
							) : (
								<span className="!text-black">{unReadLength! > 9 ? "9+" : unReadLength}</span>
							)}
						</div>
					)}
				</li>
			))}
		</ul>
	);
};

export { MenuSheetMain };
