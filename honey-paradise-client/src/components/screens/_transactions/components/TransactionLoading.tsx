import type { FC } from "react"

import { Skeleton, TableCell, TableRow } from "@/components/ui/common"

interface IProps {
	length: number | null
}

const TransactionLoading: FC<IProps> = ({ length }) => {
	return (
		length
			? Array(Math.min(length, 15)).fill(0)
			: ["a", "b", "c", "d", "e", "f"]
	).map((key, i) => (
		<TableRow key={key !== 0 ? key : i + 1} exit={{ opacity: 0 }}>
			<TableCell>
				<Skeleton className="h-5 w-36" />
			</TableCell>

			<TableCell>
				<Skeleton className="h-6 w-28" />
			</TableCell>

			<TableCell>
				<Skeleton className="h-5 w-24" />
			</TableCell>

			<TableCell>
				<Skeleton className="h-6 w-44" />
			</TableCell>

			<TableCell>
				<Skeleton className="h-5 w-36" />
			</TableCell>
		</TableRow>
	))
}

export { TransactionLoading }
