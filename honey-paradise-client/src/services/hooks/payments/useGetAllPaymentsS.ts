import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

import { useTransactionsQuery } from "@/components/screens/_transactions/hooks/useTransactionsQuery"
import { paymentsService } from "@/services/payments.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { PaymentsControllerGetAllByUserParams } from "@/shared/types/server"

export const useGetAllPaymentsS = () => {
	const { queryParams, updatePagination } = useTransactionsQuery()

	const params: PaymentsControllerGetAllByUserParams = {
		...queryParams,
		page: queryParams.page,
		status: queryParams.status.join(",")
	}

	const { data, isPending, refetch } = useQuery({
		queryKey: [queryKeys.getAllPayments, ...Object.values(params)],
		queryFn: () => paymentsService.getAll(params)
	})

	useEffect(() => {
		if (data?.length) return updatePagination(data.length)
	}, [data?.length, queryParams.pagination])

	return useMemo(
		() => ({
			payments: data,
			isPaymentsLoading: isPending,
			refetchPayments: refetch
		}),
		[data, isPending]
	)
}
