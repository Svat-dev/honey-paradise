import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { orderService } from "@/services/order.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import { useAuth } from "@/shared/lib/hooks/auth"

export const useGetMyOrdersS = () => {
	const { isAuthenticated } = useAuth()

	const { data, isLoading, isPending } = useQuery({
		queryKey: [queryKeys.getAllOrders],
		queryFn: () => orderService.getAll(),
		enabled: isAuthenticated
	})

	const _isLoading = isLoading || isPending

	return useMemo(
		() => ({
			orders: data?.data,
			isOrdersLoading: _isLoading
		}),
		[data?.data, _isLoading]
	)
}
