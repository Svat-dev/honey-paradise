import { useGetAllPaymentsS } from "@/services/hooks/payments"
import { useMyAccount } from "@/shared/lib/hooks/auth"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"
import { useLocale } from "next-intl"
import { useMemo } from "react"

export const useTransactionContent = () => {
  const locale = useLocale()

	const { user, isAccLoading } = useMyAccount()
	const { payments, isPaymentsLoading } = useGetAllPaymentsS()

	const { getPrice } = useGetPrice(user?.settings.defaultCurrency)

  const isLoading = isAccLoading || isPaymentsLoading

  return useMemo(() => ({
    locale,
    isLoading,
    payments,
    getPrice
  }), [
    locale,
    payments,
    user?.settings.defaultCurrency,
    isLoading
  ])
}