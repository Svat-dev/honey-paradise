import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import { productsService } from "@/services/products.service"
import { EnumStorageKeys } from "@/shared/lib/constants/base"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { GetProductBySlugResponse } from "@/shared/types/server"

import type { IViewedProductsHistory } from "../types/product.type"

export const useProduct = (
	initialData: GetProductBySlugResponse,
	currentArticle: number,
	slug: string
) => {
	const { data, isLoading } = useQuery({
		queryKey: [queryKeys.getProductPage, slug],
		queryFn: () => productsService.getBySlug(slug),
		initialData
	})

	const variantId = data.variants.find(i => i.article === currentArticle)?.id

	const totalDiscount = data.discounts.reduce(
		(acc, curr) => acc + curr.discount,
		0
	)

	useEffect(() => {
		const history: IViewedProductsHistory[] = JSON.parse(
			localStorage.getItem(EnumStorageKeys.VIEWED_PRODUCTS_HISTORY) || "[]"
		)

		if (!history.find(item => item.id === data.id)) {
			if (history.length >= 10) history.shift()

			const timestamp = new Date().toISOString()

			history.push({ id: data.id, timestamp })
			localStorage.setItem(
				EnumStorageKeys.VIEWED_PRODUCTS_HISTORY,
				JSON.stringify(history)
			)
		}
	}, [])

	return {
		data,
		variantId,
		totalDiscount,
		isProductLoading: isLoading
	}
}
