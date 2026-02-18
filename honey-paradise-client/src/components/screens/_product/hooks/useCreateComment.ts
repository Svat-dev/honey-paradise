import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import {
	useCreateCommentS,
	useReplyToCommentS
} from "@/services/hooks/products/reviews/comment/useCreateCommentS"
import {
	createCommentSchema,
	type TCreateCommentSchema
} from "@/shared/lib/schemas/create-review.schema"
import { highlightComment } from "@/shared/lib/utils/ui"

export const useCreateComment = (
	reviewId: string,
	replyId: string | undefined
) => {
	const t = useTranslations("global.product.content.reviews.item")
	const st = useTranslations("global.product.content.schema")

	const { createCommentAsync, isCreatingComment } = useCreateCommentS()
	const { replyToCommentAsync, isReplyingToComment } = useReplyToCommentS()

	const form = useForm<TCreateCommentSchema>({
		resolver: zodResolver(createCommentSchema(st)),
		mode: "onSubmit",
		defaultValues: { comment: "" }
	})

	const onSubmit = async (data: TCreateCommentSchema) => {
		const { comment, replyId } = data

		try {
			if (!!replyId)
				await replyToCommentAsync({ text: comment, commentId: replyId })
			else await createCommentAsync({ text: comment, reviewId })

			form.reset()

			toast.success("Комментарий оставлен!")
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError)

			toast.error(errMsg)
		}
	}

	const handleHighlight = () =>
		highlightComment(form.getValues("replyId") || undefined)

	useEffect(() => {
		if (replyId && replyId.length > 0) form.setValue("replyId", replyId)
	}, [replyId])

	return {
		t,
		form,
		onSubmit: form.handleSubmit(onSubmit),
		handleHighlight,
		isLoading: isCreatingComment || isReplyingToComment
	}
}
