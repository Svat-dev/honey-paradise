import { productsService } from "@/services/products.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export const useGetPopularProductsS = () => {
	const { data, isLoading } = useQuery({
		queryKey: [queryKeys.getPopularProducts],
		queryFn: () => productsService.getPopular(),
		enabled: true,
	});

	return useMemo(
		() => ({
			popularProducts: data?.data,
			isPopularProductsLoading: isLoading,
		}),
		[data?.data, isLoading]
	);
};
