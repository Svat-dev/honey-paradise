import { useMutation, useQueryClient } from "@tanstack/react-query"

import { commentsService } from "@/services/commetns.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { CreateCommentDto, ReplyToCommentDto } from "@/shared/types/server"

export const useCreateCommentS = () => {
	const client = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.createReviewComment],
		mutationFn: (dto: CreateCommentDto) => commentsService.createComment(dto),
		onSuccess: () =>
			client.refetchQueries({
				queryKey: [queryKeys.getReviewComments],
				type: "all"
			})
	})

	return {
		createCommentAsync: mutateAsync,
		isCreatingComment: isPending
	}
}

export const useReplyToCommentS = () => {
	const client = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.replyToComment],
		mutationFn: (dto: ReplyToCommentDto) => commentsService.replyToComment(dto),
		onSuccess: () =>
			client.refetchQueries({
				queryKey: [queryKeys.getReviewComments],
				type: "all"
			})
	})

	return {
		replyToCommentAsync: mutateAsync,
		isReplyingToComment: isPending
	}
}
