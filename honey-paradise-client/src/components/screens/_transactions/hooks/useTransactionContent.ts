import { useMemo, useState } from "react"

import { useGetAllPaymentsS } from "@/services/hooks/payments"
import { useMyAccount } from "@/shared/lib/hooks/auth"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"
import { useLanguage } from "@/shared/lib/i18n/hooks"

export const useTransactionContent = () => {
	const { locale } = useLanguage()

	const { user, isAccLoading } = useMyAccount()
	const { payments, isPaymentsLoading, refetchPayments } = useGetAllPaymentsS()

	const [colIndex, setColIndex] = useState<number>(-1)

	const { getPrice } = useGetPrice(user?.settings.defaultCurrency)

	const isLoading = isAccLoading || isPaymentsLoading

	return useMemo(
		() => ({
			locale,
			isLoading,
			payments,
			colIndex,
			refetchPayments,
			getPrice,
			setColIndex
		}),
		[locale, colIndex, payments, user?.settings.defaultCurrency, isLoading]
	)
}
