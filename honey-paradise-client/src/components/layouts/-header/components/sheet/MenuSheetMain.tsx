"use client"

import { Loader2Icon } from "lucide-react"

import { Link } from "@/components/ui/common"

import { useMenuSheetMain } from "../../hooks/useMenuSheetMain"

const MenuSheetMain = () => {
	const { data, unReadLength, isNotificationsLoading } = useMenuSheetMain()

	return (
		<ul className="mt-5 flex list-none flex-col items-end">
			{data.map(item => (
				<li
					className="relative mt-3 transition-all hover:-translate-x-2 hover:text-muted"
					key={item.title}
				>
					<Link href={item.link} className="flex items-center gap-1.5">
						<p>{item.title}</p>
						<item.icon />
					</Link>

					{item.isNotifications && (
						<div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary p-0.5 text-xs">
							{isNotificationsLoading ? (
								<Loader2Icon className="animate-spin" size={16} />
							) : (
								<span className="!text-black">
									{unReadLength! > 9 ? "9+" : unReadLength}
								</span>
							)}
						</div>
					)}
				</li>
			))}
		</ul>
	)
}

export { MenuSheetMain }
