"use client";

import { productsService } from "@/services/products.service";
import { queryKeys } from "@constants/routes";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useGetAllCatsWithProdS = () => {
	const q = useSearchParams().get("q");

	const { data, isPending, isLoading, refetch } = useQuery({
		queryKey: [queryKeys.getAllCatsWithProducts, q],
		queryFn: () => productsService.getAllCatsWithProducts(q || undefined),
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
