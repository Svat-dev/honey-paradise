import { reviewService } from "@/services/reviews.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetReviewsS = (productId: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [queryKeys.getProductsReviews, productId],
		queryFn: () => reviewService.getProductsReviews({ pid: productId }),
		enabled: !!productId,
	});

	return useMemo(
		() => ({
			reviewsData: data,
			isReviewsLoading: isLoading,
		}),
		[data, isLoading]
	);
};
