import { useEffect } from "react"

import { EnumStorageKeys } from "@/shared/lib/constants/base"
import { useMyAccount } from "@/shared/lib/hooks/auth"

import type { IViewedProductsHistory } from "../types/product.type"

export const useProduct = (id: string) => {
	const { user, isAccLoading } = useMyAccount()

	useEffect(() => {
		const history: IViewedProductsHistory[] = JSON.parse(
			localStorage.getItem(EnumStorageKeys.VIEWED_PRODUCTS_HISTORY) || "[]"
		)

		if (!history.find(item => item.id === id)) {
			if (history.length >= 10) history.shift()

			const timestamp = new Date().toISOString()

			history.push({ id, timestamp })
			localStorage.setItem(
				EnumStorageKeys.VIEWED_PRODUCTS_HISTORY,
				JSON.stringify(history)
			)
		}
	}, [])

	return {
		user,
		isAccLoading
	}
}
