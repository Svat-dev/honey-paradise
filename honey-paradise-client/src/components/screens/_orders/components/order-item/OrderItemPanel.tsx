import { format } from "date-fns"
import { useTranslations } from "next-intl"
import type { FC } from "react"

import { Link, Skeleton } from "@/components/ui/common"
import { useGetOrderExtraS } from "@/services/hooks/order/useGetOrderExtraS"
import { EnumAppRoute } from "@/shared/lib/constants/routes"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"
import { cn } from "@/shared/lib/utils/base"
import { getOrderStatusClassName } from "@/shared/lib/utils/payments"
import type { GetMyCartResponseCurrency } from "@/shared/types/server"

import { OrderItemProduct } from "./OrderItemProduct"

interface IOrderItemPanel {
	currency: GetMyCartResponseCurrency | undefined
	orderId: string
	length: number
}

const OrderItemPanel: FC<IOrderItemPanel> = ({ orderId, length, currency }) => {
	const tt = useTranslations("global.transactions.content")

	const { extraData, isOrdersExtraLoading } = useGetOrderExtraS(orderId)

	const { sign, getPrice } = useGetPrice(currency)

	const statusCn = getOrderStatusClassName(extraData?.transaction.status)

	return (
		<>
			{isOrdersExtraLoading
				? new Array(length)
						.fill(0)
						.map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
				: extraData?.items.map(item => (
						<OrderItemProduct
							key={item.id}
							{...item}
							price={getPrice(item.price, false, true) + sign}
						/>
					))}

			<footer className="flex items-center justify-between px-2">
				<div className="mb-1 flex items-center gap-2">
					<span className="text-xl">
						Итого:&nbsp;
						<strong>
							{getPrice(extraData?.transaction.amount || 0, true, false)}
						</strong>
					</span>

					<span className={cn("rounded-full px-3 py-2 text-sm", statusCn)}>
						{tt("status", { status: extraData?.transaction.status || "" })}
					</span>
				</div>

				<Link
					href={EnumAppRoute.MY_PAYMENTS + `?q=${extraData?.transaction.id}`}
					className="block italic text-muted underline"
					isOutside
				>
					Платеж от&nbsp;
					<time dateTime={extraData?.transaction.createdAt!}>
						{format(
							extraData?.transaction.createdAt || new Date(),
							"dd.MM.yyyy"
						)}
					</time>
				</Link>
			</footer>
		</>
	)
}

export { OrderItemPanel }
