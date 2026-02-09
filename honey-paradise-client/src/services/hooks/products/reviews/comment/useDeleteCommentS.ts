import { useMutation } from "@tanstack/react-query"

import { commentsService } from "@/services/commetns.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useDeleteCommentS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.deleteComment],
		mutationFn: (id: string) => commentsService.deleteComment(id)
	})

	return {
		deleteCommentAsync: mutateAsync,
		isCommentDeleting: isPending
	}
}
