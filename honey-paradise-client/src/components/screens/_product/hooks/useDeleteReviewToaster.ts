import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useDeleteReviewS } from "@/services/hooks/products"

export const useDeleteReviewToaster = (
	setNotDeleted: VoidFunction,
	removeToast: VoidFunction,
	reviewId: string
) => {
	const t = useTranslations("global.product.content.reviews.item.deleteToaster")

	const { deleteReviewAsync } = useDeleteReviewS()
	const [timer, setTimer] = useState<number>(10)

	const cancelDeleting = () => {
		setTimer(10)
		setNotDeleted()
		removeToast()
	}

	const handleDeleteReview = async () => {
		try {
			await deleteReviewAsync(reviewId)
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError)
			toast.error(errMsg)
		} finally {
			removeToast()
		}
	}

	const agreeWithDeleting = () => setTimer(0)

	useEffect(() => {
		if (timer <= -1) {
			handleDeleteReview()
			return
		}

		const timeout = setTimeout(() => {
			setTimer(prev => prev - 0.5)
		}, 500)

		return () => {
			clearTimeout(timeout)
		}
	}, [timer])

	const progressWidth = (timer / 10) * 100

	return {
		t,
		cancelDeleting,
		progressWidth,
		agreeWithDeleting
	}
}
