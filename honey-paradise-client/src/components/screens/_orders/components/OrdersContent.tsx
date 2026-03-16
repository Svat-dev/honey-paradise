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
			<div className="sr-only bg-green-400/50 text-green-700 ring-1 ring-green-700" />
			<div className="sr-only bg-red-400/50 text-red-700 ring-1 ring-red-700" />
			<div className="sr-only bg-lime-400/50 text-lime-700 ring-1 ring-lime-700" />

			<AnimatePresence mode="sync">
				{isOrdersLoading ? (
					<OrdersLoading />
				) : orders && orders.length > 0 ? (
					<Accordion>
						{orders?.map((item, i) => (
							<OrderItem
								key={item.id}
								i={i}
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
