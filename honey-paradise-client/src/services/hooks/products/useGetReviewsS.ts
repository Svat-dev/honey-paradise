import { queryKeys } from "@/shared/lib/constants/routes";
import { reviewService } from "@/services/reviews.service";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export const useGetReviewsS = (productId: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [queryKeys.getProductsReviews],
		queryFn: () => reviewService.getProductsReviews(productId),
		enabled: !!productId,
	});

	return useMemo(
		() => ({
			reviews: data,
			isReviewsLoading: isLoading,
		}),
		[data, isLoading]
	);
};
