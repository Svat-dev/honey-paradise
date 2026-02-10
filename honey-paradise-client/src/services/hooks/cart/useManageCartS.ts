import { queryKeys } from "@constants/routes"
import { useMutation } from "@tanstack/react-query"

import { cartService } from "@/services/cart.service"
import type { AddCartItemDto, UpdateQuantityDto } from "@/shared/types/server"

export const useAddCartItemS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.addCartItem],
		mutationFn: (dto: AddCartItemDto) => cartService.addToCart(dto)
	})

	return {
		addCartItemAsync: mutateAsync,
		isAddingCartItem: isPending
	}
}

export const useDeleteCartItemS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.deleteCartItem],
		mutationFn: (id: string) => cartService.deleteFromCart(id)
	})

	return {
		deleteCartItemAsync: mutateAsync,
		isDeletingCartItem: isPending
	}
}

export const useUpdateQuantityS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.updateCartItemQuantity],
		mutationFn: (dto: UpdateQuantityDto) => cartService.updateQuantity(dto)
	})

	return {
		updateQuantityAsync: mutateAsync,
		isUpdatingQuantity: isPending
	}
}

export const useClearCartS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.clearAllCart],
		mutationFn: () => cartService.clearAllCart()
	})

	return {
		clearCartAsync: mutateAsync,
		isClearingCart: isPending
	}
}
