import { useMutation, useQueryClient } from "@tanstack/react-query"

import { reviewService } from "@/services/reviews.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { UpdateReviewDto } from "@/shared/types/server"

export const useEditReviewS = () => {
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
		mutationKey: [queryKeys.updateProductReview],
		mutationFn: (dto: UpdateReviewDto) => reviewService.editReview(dto),
		onSuccess
	})

	return {
		editReviewAsync: mutateAsync,
		isEditingReview: isPending
	}
}
