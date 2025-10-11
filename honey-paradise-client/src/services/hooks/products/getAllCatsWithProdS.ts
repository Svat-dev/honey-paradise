import { productsService } from "@/services/products.service";
import { queryKeys } from "@constants/routes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetAllCatsWithProdS = () => {
	const { data, isPending, isLoading, refetch } = useQuery({
		queryKey: [queryKeys.getAllCatsWithProducts],
		queryFn: () => productsService.getAllCatsWithProducts(),
		enabled: true,
	});

	const _isLoading = isLoading || isPending;

	return useMemo(
		() => ({
			catsWithProducts: data?.data,
			isCatsWithProductsLoading: _isLoading,
			refetchCatsWithProducts: refetch,
		}),
		[data?.data, _isLoading]
	);
};
