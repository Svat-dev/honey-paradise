import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { instance } from "@/api/instance"
import { useGetMyOrdersS } from "@/services/hooks/order/useGetMyOrdersS"
import { useMyCart } from "@/shared/lib/hooks/auth"

/**
 * Hook for orders content component
 * @param paid status of the order (for toaster)
 * @param paymentId id of the payment (for capture) | Dev only
 * @returns orders, user's currency, status of loading
 */
export const useOrdersContent = (
	paid: boolean,
	paymentId: string | undefined
) => {
	const t = useTranslations("global.orders.content")

	const { push } = useRouter()
	const pathname = usePathname()

	const { cart } = useMyCart()
	const { orders, isOrdersLoading } = useGetMyOrdersS()

	useEffect(() => {
		if (paid) {
			toast.success(t("paid"))
			push(pathname)
		}
	}, [paid])

	// Dev only
	useEffect(() => {
		if (paymentId) instance.post(`/payments/capture/${paymentId}`)
	}, [paymentId])

	return {
		orders,
		currency: cart?.currency,
		isOrdersLoading
	}
}
