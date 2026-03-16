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
import { getOrderStatusClassName } from "@/shared/lib/utils/payments"
import type {
	GetAllOrdersResponse,
	GetMyCartResponseCurrency
} from "@/shared/types/server"

import { OrderItemPanel } from "./OrderItemPanel"

interface IOrderItem extends GetAllOrdersResponse {
	locale: string
	currency: GetMyCartResponseCurrency | undefined
}

const OrderItem: FC<IOrderItem> = ({
	locale,
	currency,
	id,
	index,
	status,
	length,
	createdAt
}) => {
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

	const statusCn = getOrderStatusClassName(status)

	return (
		<AccordionItem>
			<AccordionHeader className="flex items-center justify-between">
				<div className="flex items-center">
					<Title size="md" className="text-2xl font-semibold">
						Заказ #{index}
					</Title>

					<p className="ml-3 font-medium">на {length} товаров</p>

					<time className="ml-5 text-muted" dateTime={createdAt}>
						{format(createdAt, `d MMMM yyyy, HH:mm`, { locale: fnsLocale })}
					</time>
				</div>

				<span className={cn("mr-14 rounded-full px-3 py-2 text-sm", statusCn)}>
					{statusTxt}
				</span>
			</AccordionHeader>

			<AccordionPanel
				className="flex flex-col gap-10"
				items={{
					height: 90 + 40,
					length,
					additional: 80
				}}
			>
				<OrderItemPanel orderId={id} length={length} currency={currency} />
			</AccordionPanel>
		</AccordionItem>
	)
}

export { OrderItem }
