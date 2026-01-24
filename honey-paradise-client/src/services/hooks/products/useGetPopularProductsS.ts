import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { productsService } from "@/services/products.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useGetPopularProductsS = () => {
	const { data, isLoading } = useQuery({
		queryKey: [queryKeys.getPopularProducts],
		queryFn: () => productsService.getPopular(),
		enabled: true
	})

	return useMemo(
		() => ({
			popularProducts: data?.data,
			isPopularProductsLoading: isLoading
		}),
		[data?.data, isLoading]
	)
}
