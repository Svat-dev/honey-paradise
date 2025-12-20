import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reviewService } from "@/services/reviews.service";
import { queryKeys } from "@/shared/lib/constants/routes";

export const useDeleteReviewS = () => {
	const client = useQueryClient();

	const onSuccess = () => {
		client.refetchQueries({ queryKey: [queryKeys.getProductPage], type: "all" });
		client.refetchQueries({ queryKey: [queryKeys.getProductsRating], type: "all" });
		client.refetchQueries({ queryKey: [queryKeys.getProductsReviews], type: "all" });
	};

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.deleteProductReview],
		mutationFn: (id: string) => reviewService.deleteReview(id),
		onSuccess,
	});

	return {
		deleteReviewAsync: mutateAsync,
		isDeletingReview: isPending,
	};
};
