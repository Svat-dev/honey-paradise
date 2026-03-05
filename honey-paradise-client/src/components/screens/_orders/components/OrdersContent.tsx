"use client"

import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { type FC, useEffect } from "react"
import toast from "react-hot-toast"

import { Title } from "@/components/ui/common"
import { useGetMyOrdersS } from "@/services/hooks/order/useGetMyOrdersS"

interface IProps {
	paid: boolean
}

const OrdersContent: FC<IProps> = ({ paid }) => {
	const t = useTranslations("global.orders.content")

	const { push } = useRouter()
	const pathname = usePathname()

	const { orders, isOrdersLoading } = useGetMyOrdersS()

	useEffect(() => {
		if (paid) {
			toast.success(t("paid"))
			push(pathname)
		}
	}, [paid])

	return (
		<>
			{isOrdersLoading ? (
				<p>Loading...</p>
			) : (
				orders?.map(item => (
					<div key={item.id}>
						<Title size="md">Order {item.id}</Title>
						<p>
							{item.items.length} on price {item.totalAmount}
						</p>
						<p>Status: {item.status}</p>
					</div>
				))
			)}
		</>
	)
}

export { OrdersContent }
