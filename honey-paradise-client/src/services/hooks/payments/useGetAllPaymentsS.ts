import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

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

	const [length, setLength] = useState<number | null>(null)

	const { data, isLoading, refetch } = useQuery({
		queryKey: [queryKeys.getAllPayments, ...Object.values(params)],
		queryFn: () => paymentsService.getAll(params)
	})

	useEffect(() => {
		if (data?.length) {
			updatePagination(data.length)
			setLength(data.length)
			return
		}
	}, [data?.length, queryParams.pagination])

	return useMemo(
		() => ({
			payments: { ...data, length },
			isPaymentsLoading: isLoading,
			refetchPayments: refetch
		}),
		[data, isLoading]
	)
}
