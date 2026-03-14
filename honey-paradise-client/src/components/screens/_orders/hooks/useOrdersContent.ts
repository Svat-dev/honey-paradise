import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

import { useGetMyOrdersS } from "@/services/hooks/order/useGetMyOrdersS"

export const useOrdersContent = (paid: boolean) => {
	const t = useTranslations("global.orders.content")

	const { push } = useRouter()
	const pathname = usePathname()

	const { orders, isOrdersLoading } = useGetMyOrdersS()

	useEffect(() => {
		if (paid) {
			toast.success(t("paid"))
			push(pathname)
		}
	}, [paid])

	return {
		orders,
		isOrdersLoading
	}
}
