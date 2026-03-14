"use client"

import { AnimatePresence } from "motion/react"
import type { FC } from "react"

import { useOrdersContent } from "../hooks/useOrdersContent"

import { OrderItem } from "./OrderItem"
import { OrdersEmpty } from "./OrdersEmpty"
import { OrdersLoading } from "./OrdersLoading"

interface IProps {
	paid: boolean
}

const OrdersContent: FC<IProps> = ({ paid }) => {
	const { orders, isOrdersLoading } = useOrdersContent(paid)

	return (
		<div className="flex flex-col gap-6">
			<AnimatePresence mode="sync">
				{isOrdersLoading ? (
					<OrdersLoading />
				) : orders && orders.length > 0 ? (
					orders?.map(item => <OrderItem key={item.id} {...item} />)
				) : (
					<OrdersEmpty />
				)}
			</AnimatePresence>
		</div>
	)
}

export { OrdersContent }
