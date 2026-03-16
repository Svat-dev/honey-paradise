import { Skeleton } from "@/components/ui/common"

const OrdersLoading = () => {
	return (
		<>
			{["a", "b", "c"].map(key => (
				<Skeleton key={key} className="mb-5 h-20 w-full" />
			))}
		</>
	)
}

export { OrdersLoading }
