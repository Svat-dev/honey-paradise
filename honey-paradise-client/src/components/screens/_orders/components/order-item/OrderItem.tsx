import { format } from "date-fns"
import { enUS, ru } from "date-fns/locale"
import { useTranslations } from "next-intl"
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
	const t = useTranslations("global.orders.content")

	const fnsLocale = locale === "ru" ? ru : enUS

	const statusCn = getOrderStatusClassName(status)

	return (
		<AccordionItem>
			<AccordionHeader className="flex items-center justify-between">
				<div className="flex items-center">
					<Title size="md" className="text-2xl font-semibold">
						{t("item.order", { index })}
					</Title>

					<p className="ml-3 font-medium">{t("item.length", { length })}</p>

					<time className="ml-5 text-muted" dateTime={createdAt}>
						{format(createdAt, `d MMMM yyyy, HH:mm`, { locale: fnsLocale })}
					</time>
				</div>

				<span className={cn("mr-14 rounded-full px-3 py-2 text-sm", statusCn)}>
					{t("status", { status })}
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
