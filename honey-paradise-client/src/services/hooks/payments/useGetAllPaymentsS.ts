import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { paymentsService } from "@/services/payments.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useGetAllPaymentsS = () => {
	const { data, isPending } = useQuery({
		queryKey: [queryKeys.getAllPayments],
		queryFn: () => paymentsService.getAll()
	})

	return useMemo(
		() => ({
			payments: data,
			isPaymentsLoading: isPending
		}),
		[data, isPending]
	)
}
