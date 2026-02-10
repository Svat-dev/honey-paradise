import { useMutation, useQueryClient } from "@tanstack/react-query"

import { reviewService } from "@/services/reviews.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { ReactToReviewDto } from "@/shared/types/server"

export const useReactToReviewS = () => {
	const client = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.reactToReview],
		mutationFn: (dto: ReactToReviewDto) => reviewService.reactToReview(dto),
		onSuccess: () =>
			client.refetchQueries({
				queryKey: [queryKeys.getProductsReviews],
				type: "all"
			})
	})

	return {
		reactToReviewAsync: mutateAsync,
		isReactingToReview: isPending
	}
}
