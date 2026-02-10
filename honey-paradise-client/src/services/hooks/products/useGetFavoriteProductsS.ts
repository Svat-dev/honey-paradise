import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { productsService } from "@/services/products.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import { useAuth } from "@/shared/lib/hooks/auth"

export const useGetFavoriteProducts = () => {
	const { isAuthenticated } = useAuth()

	const { data, isLoading, isPending } = useQuery({
		queryKey: [queryKeys.getFavoriteProducts],
		queryFn: () => productsService.getFavorites(),
		enabled: isAuthenticated
	})

	const _isLoading = isLoading || isPending

	return useMemo(
		() => ({
			favoriteProducts: data,
			isFavoritesLoading: _isLoading
		}),
		[_isLoading, data]
	)
}
