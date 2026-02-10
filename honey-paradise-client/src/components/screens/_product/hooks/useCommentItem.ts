import type { AxiosError } from "axios"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useDeleteCommentS } from "@/services/hooks/products/reviews/comment/useDeleteCommentS"

import { useTranslateReviewText } from "./useTranslateReviewText"

export const useCommentItem = (id: string, text: string) => {
	const { deleteCommentAsync, isCommentDeleting } = useDeleteCommentS()
	const { state, isTranslating, translate } = useTranslateReviewText(id, text)

	const deleteComment = async () => {
		try {
			await deleteCommentAsync(id)

			toast.success("Комментарий удален!")
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError)

			toast.error(errMsg)
		}
	}

	return {
		state,
		isTranslating,
		isCommentDeleting,
		translate,
		deleteComment
	}
}
