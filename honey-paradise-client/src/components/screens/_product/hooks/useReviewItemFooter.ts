import { AxiosError } from "axios"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useReactToReviewS } from "@/services/hooks/products"
import type { ReactToReviewDtoType } from "@/shared/types/server"

export const useReviewItemFooter = (id: string) => {
	const { reactToReviewAsync, isReactingToReview } = useReactToReviewS()

	const handleReactToReview = async (type: ReactToReviewDtoType) => {
		try {
			await reactToReviewAsync({ reviewId: id, type })
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError)
			toast.error(errMsg)
		}
	}

	return {
		isReactingToReview,
		handleReactToReview
	}
}
