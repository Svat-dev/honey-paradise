import { useMutation, useQueryClient } from "@tanstack/react-query"

import { commentsService } from "@/services/commetns.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useDeleteCommentS = () => {
	const client = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.deleteComment],
		mutationFn: (id: string) => commentsService.deleteComment(id),
		onSuccess: () =>
			client.refetchQueries({
				queryKey: [queryKeys.getReviewComments],
				type: "all"
			})
	})

	return {
		deleteCommentAsync: mutateAsync,
		isCommentDeleting: isPending
	}
}
