"use client"

import { AnimatePresence } from "motion/react"
import type { FC } from "react"

import { Accordion } from "@/components/ui/common"

import { useOrdersContent } from "../hooks/useOrdersContent"

import { OrderItem } from "./order-item/OrderItem"
import { OrdersEmpty } from "./OrdersEmpty"
import { OrdersLoading } from "./OrdersLoading"

interface IProps {
	paid: boolean
	locale: string
}

const OrdersContent: FC<IProps> = ({ paid, locale }) => {
	const { orders, currency, isOrdersLoading } = useOrdersContent(paid)

	return (
		<div className="flex flex-col gap-4">
			<AnimatePresence mode="sync">
				{isOrdersLoading ? (
					<OrdersLoading />
				) : orders && orders.length > 0 ? (
					<Accordion>
						{orders?.map(item => (
							<OrderItem
								key={item.id}
								locale={locale}
								currency={currency}
								{...item}
							/>
						))}
					</Accordion>
				) : (
					<OrdersEmpty />
				)}
			</AnimatePresence>
		</div>
	)
}

export { OrdersContent }
