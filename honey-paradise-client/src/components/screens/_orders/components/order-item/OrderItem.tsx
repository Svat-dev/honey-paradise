import { format } from "date-fns"
import { enUS, ru } from "date-fns/locale"
import type { FC } from "react"

import {
	AccordionHeader,
	AccordionItem,
	AccordionPanel,
	Title
} from "@/components/ui/common"
import { cn } from "@/shared/lib/utils/base"
import { GetAllOrdersResponse } from "@/shared/types/server"

interface IOrderItem extends GetAllOrdersResponse {
	locale: string
}

const OrderItem: FC<IOrderItem> = ({ locale, index, status, createdAt }) => {
	const fnsLocale = locale === "ru" ? ru : enUS

	const statusTxt =
		status === "DELIVERED"
			? "Доставлен"
			: status === "CANCELED"
				? "Отменён"
				: status === "PENDING"
					? "В ожидании"
					: status === "IN_ROAD"
						? "В дороге"
						: ""

	const statusCn =
		status === "DELIVERED"
			? "text-green-700 bg-green-400/50"
			: status === "CANCELED"
				? "text-red-700 bg-red-400/50"
				: status === "PENDING"
					? "text-black bg-muted/30"
					: status === "IN_ROAD"
						? "text-lime-700 bg-lime-400/50"
						: ""

	return (
		<AccordionItem>
			<AccordionHeader className="flex items-center justify-between">
				<div className="flex items-center gap-6">
					<Title size="md" className="font-medium">
						Заказ #{index}
					</Title>

					<time className="text-muted" dateTime={createdAt}>
						{format(createdAt, `d MMMM yyyy, HH:mm`, { locale: fnsLocale })}
					</time>
				</div>

				<span className={cn("mr-14 rounded-full px-3 py-2 text-sm", statusCn)}>
					{statusTxt}
				</span>
			</AccordionHeader>

			<AccordionPanel>Some text</AccordionPanel>
		</AccordionItem>
	)
}

export { OrderItem }
