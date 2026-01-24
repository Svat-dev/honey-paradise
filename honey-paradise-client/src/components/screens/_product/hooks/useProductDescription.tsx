import { useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useSwitchFavoritesProducts } from "@/services/hooks/products"
import { EnumAppRoute, queryKeys } from "@/shared/lib/constants/routes"
import { useMyCart } from "@/shared/lib/hooks/auth"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"
import type { GetMyCartResponseCurrency } from "@/shared/types/server"

export const useProductDescription = (
	id: string,
	isLikedServer: boolean,
	currency: GetMyCartResponseCurrency | undefined
) => {
	const t = useTranslations("global.product.content")
	const locale = useLocale()

	const { push } = useRouter()
	const client = useQueryClient()
	const { getPrice } = useGetPrice(currency)

	const { addCartItem, cart, loading } = useMyCart()
	const { switchFavoriteProductAsync, isSwitchingFavoritesProduct } =
		useSwitchFavoritesProducts(queryKeys.getMyAccount)

	const [isLiked, setIsLiked] = useState<boolean | null>(null)

	const isInCart = cart?.cartItems.some(el => el.product.id === id)

	const handleSwitchFavorite = async () => {
		try {
			setIsLiked(prev => (prev === null ? !isLikedServer : !prev))
			await switchFavoriteProductAsync(id)
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			toast.error(errMsg)
			setIsLiked(prev => !prev)
		}
	}

	const handleAddToCart = () => {
		if (isInCart) return push(EnumAppRoute.MY_CART)

		const onSuccess = () => {
			client.refetchQueries({ queryKey: [queryKeys.getMyCart], type: "all" })
			toast.success("Товар добавлен в корзину!")
		}

		addCartItem({ productId: id, quantity: 1 }, onSuccess)
	}

	return {
		t,
		handleSwitchFavorite,
		handleAddToCart,
		getPrice,
		isLiked,
		isInCart,
		loading,
		isSwitchingFavoritesProduct,
		locale
	}
}
