import { productsService } from "@/services/products.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetProductsRatingS = (slug: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [queryKeys.getProductsRating, slug],
		queryFn: () => productsService.getRating(slug),
		enabled: !!slug,
	});

	return useMemo(
		() => ({
			rating: data?.data,
			isRatingLoading: isLoading,
		}),
		[data?.data, isLoading]
	);
};
