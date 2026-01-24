import { useMutation, useQueryClient } from "@tanstack/react-query"

import { reviewService } from "@/services/reviews.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { CreateReviewsDto } from "@/shared/types/server"

export const useCreateProductReviewS = () => {
	const client = useQueryClient()

	const onSuccess = () => {
		client.refetchQueries({ queryKey: [queryKeys.getProductPage], type: "all" })
		client.refetchQueries({
			queryKey: [queryKeys.getProductsRating],
			type: "all"
		})
		client.refetchQueries({
			queryKey: [queryKeys.getProductsReviews],
			type: "all"
		})
	}

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.createProductReview],
		mutationFn: (dto: CreateReviewsDto) =>
			reviewService.createProductReview(dto),
		onSuccess
	})

	return {
		createProductReviewAsync: mutateAsync,
		isCreatingProductReview: isPending
	}
}
