import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useSwitchFavoritesProducts } from "@/services/hooks/products"
import { useMyCart } from "@/shared/lib/hooks/auth"
import { useLanguage } from "@/shared/lib/i18n/hooks"

export const useFavoritesProductCard = (id: string) => {
	const t = useTranslations("global.favorites.content")

	const { addCartItem, loading } = useMyCart()
	const { switchFavoriteProductAsync, isSwitchingFavoritesProduct } =
		useSwitchFavoritesProducts()
	const { locale } = useLanguage(false)

	const handleDeleteFavorite = async () => {
		try {
			await switchFavoriteProductAsync(id)
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			toast.error(errMsg)
		}
	}

	const handleAddToCart = () => addCartItem({ variantId: id, quantity: 1 })

	return {
		handleDeleteFavorite,
		handleAddToCart,
		loading,
		isSwitchingFavoritesProduct,
		locale,
		t
	}
}
