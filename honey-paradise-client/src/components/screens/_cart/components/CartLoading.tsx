import type { FC } from "react"

import { Skeleton } from "@/components/ui/common"

interface ICartLoading {
	limit: number
}

const CartLoading: FC<ICartLoading> = ({ limit }) => {
	const items = Array.from({ length: limit }, (_, i) => i + 1)

	return (
		<>
			{items.map(num => (
				<Skeleton key={num} className="h-28 w-full" />
			))}
		</>
	)
}

export { CartLoading }
