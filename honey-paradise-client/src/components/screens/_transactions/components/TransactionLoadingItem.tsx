import { Skeleton, TableCell, TableRow } from "@/components/ui/common"

const TransactionLoadingItem = () => {
	return (
		<TableRow exit={{ opacity: 0 }}>
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
	)
}

export { TransactionLoadingItem }
