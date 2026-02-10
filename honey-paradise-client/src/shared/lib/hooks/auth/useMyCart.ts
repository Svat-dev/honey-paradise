import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import {
	useAddCartItemS,
	useClearCartS,
	useDeleteCartItemS,
	useGetMyCartS,
	useUpdateQuantityS
} from "@/services/hooks/cart"
import type { AddCartItemDto, UpdateQuantityDto } from "@/shared/types/server"

import { useLanguage } from "../../i18n/hooks"

export const useMyCart = () => {
	const t = useTranslations("global.cart.content")
	const { locale } = useLanguage(false)

	const { cart, isCartLoading, refetchCart } = useGetMyCartS()

	const { addCartItemAsync, isAddingCartItem } = useAddCartItemS()
	const { deleteCartItemAsync, isDeletingCartItem } = useDeleteCartItemS()
	const { updateQuantityAsync, isUpdatingQuantity } = useUpdateQuantityS()
	const { clearCartAsync, isClearingCart } = useClearCartS()

	const addCartItem = async (dto: AddCartItemDto, fn?: Function) => {
		try {
			await addCartItemAsync(dto, { onSuccess: () => fn?.() })
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			toast.error(errMsg)
		}
	}

	const deleteCartItem = async (id: string, fn?: Function) => {
		try {
			await deleteCartItemAsync(id, { onSuccess: () => fn?.() })

			refetchCart()
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			toast.error(errMsg)
		}
	}

	const updateQuantity = async (dto: UpdateQuantityDto, fn?: Function) => {
		try {
			await updateQuantityAsync(dto, { onSuccess: () => fn?.() })
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			toast.error(errMsg)
		} finally {
			refetchCart()
		}
	}

	const clearCart = async (fn?: Function) => {
		try {
			await clearCartAsync(undefined, { onSuccess: () => fn?.() })
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			toast.error(errMsg)
		} finally {
			refetchCart()
		}
	}

	const loading = {
		default: isCartLoading,
		add: isAddingCartItem,
		delete: isDeletingCartItem,
		update: isUpdatingQuantity,
		clear: isClearingCart
	}

	return useMemo(
		() => ({
			cart,
			loading,
			addCartItem,
			deleteCartItem,
			updateQuantity,
			clearCart,
			refetchCart,
			locale,
			t
		}),
		[
			cart,
			loading,
			addCartItem,
			deleteCartItem,
			updateQuantity,
			clearCart,
			locale
		]
	)
}
