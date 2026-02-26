import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

import { useMyCart } from "@/shared/lib/hooks/auth"
import type { UpdateQuantityDtoType } from "@/shared/types/server"

export const useCartCounter = (id: string, canDelete: boolean, q?: number) => {
	const t = useTranslations("global.cart.content")

	const { cart, loading, updateQuantity, deleteCartItem } = useMyCart()
	const [amount, setAmount] = useState<number>(q ? q : 0)

	const changeQuantity = (type: UpdateQuantityDtoType, cartItemId: string) => {
		if (canDelete && amount <= 1 && type === "decrease")
			return deleteCartItem(cartItemId)

		setAmount(prev => (type === "increase" ? prev + 1 : prev - 1))

		updateQuantity({ type, cartItemId }, undefined, () =>
			setAmount(prev => (type === "increase" ? prev - 1 : prev + 1))
		)
	}

	const quantity = cart?.cartItems.find(i => i.id === id)?.quantity || 0

	useEffect(() => {
		if (quantity !== amount) setAmount(quantity)
	}, [quantity])

	return {
		t,
		amount,
		isLoading: loading.update || loading.default || loading.delete,
		changeQuantity
	}
}
