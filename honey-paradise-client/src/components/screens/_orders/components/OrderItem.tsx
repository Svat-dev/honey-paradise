import type { FC } from "react"

import { GetAllOrdersResponse } from "@/shared/types/server"

interface IOrderItem extends GetAllOrdersResponse {}

const OrderItem: FC<IOrderItem> = ({}) => {
	return <article></article>
}

export { OrderItem }
