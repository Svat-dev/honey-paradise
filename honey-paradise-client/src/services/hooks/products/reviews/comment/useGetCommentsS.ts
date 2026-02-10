import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { commentsService } from "@/services/commetns.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useGetCommentsS = (reviewId: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [queryKeys.getReviewComments, reviewId],
		queryFn: () => commentsService.getByReviewId(reviewId),
		enabled: !!reviewId
	})

	return useMemo(
		() => ({
			comments: data?.data,
			isCommentsLoading: isLoading
		}),
		[data?.data, isLoading]
	)
}
