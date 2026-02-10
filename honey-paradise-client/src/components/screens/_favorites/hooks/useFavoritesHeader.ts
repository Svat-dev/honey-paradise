import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import {
	useAddFavoritesToCart,
	useClearFavoritesProducts
} from "@/services/hooks/products"

export const useFavoritesHeader = () => {
	const t = useTranslations("global.favorites.content")
	const { clearFavoritesProductsAsync, isClearingFavoritesProducts } =
		useClearFavoritesProducts()
	const { addFavoritesToCartAsync, isAddingFavoritesToCart } =
		useAddFavoritesToCart()

	const handleClearFavorites = async () => {
		try {
			await clearFavoritesProductsAsync()
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			toast.error(errMsg)
		}
	}

	const handleAddFavoritesToCart = async () => {
		try {
			await addFavoritesToCartAsync()
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			toast.error(errMsg)
		}
	}

	return {
		handleClearFavorites,
		handleAddFavoritesToCart,
		isClearingFavoritesProducts,
		isAddingFavoritesToCart,
		t
	}
}
