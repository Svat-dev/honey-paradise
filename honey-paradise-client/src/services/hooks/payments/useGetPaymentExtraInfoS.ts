import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { paymentsService } from "@/services/payments.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useGetPaymentExtraInfoS = (id: string) => {
	const { data, isPending } = useQuery({
		queryKey: [queryKeys.getPaymentExtraInfo, id],
		queryFn: () => paymentsService.getExtraInfo(id)
	})

	return useMemo(
		() => ({
			paymentExtra: data,
			isPaymentExtraLoading: isPending
		}),
		[data, isPending]
	)
}
