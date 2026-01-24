import type { FC } from "react"

import { Skeleton } from "@/components/ui/common"

interface IFavoritesLoading {
	limit: number
}

const FavoritesLoading: FC<IFavoritesLoading> = ({ limit }) => {
	const items = Array.from({ length: limit }, (_, i) => i + 1)

	return (
		<>
			{items.map(num => (
				<Skeleton key={num} className="h-32 w-full" />
			))}
		</>
	)
}

export { FavoritesLoading }
