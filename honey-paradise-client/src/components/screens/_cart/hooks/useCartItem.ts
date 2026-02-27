import { useTranslations } from "next-intl"

import { useMyCart } from "@/shared/lib/hooks/auth"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"
import type { GetMyCartResponseCurrency } from "@/shared/types/server"

export const useCartItem = (currency: GetMyCartResponseCurrency) => {
	const t = useTranslations("global.cart.content")

	const { loading, deleteCartItem } = useMyCart()
	const { getPrice } = useGetPrice(currency)

	return {
		deleteCartItem,
		isDeleting: loading.delete,
		isLoading: loading.delete || loading.update,
		getPrice,
		t
	}
}
