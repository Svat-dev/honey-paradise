import { z } from "zod"

import { VALUES } from "../constants/base"

const ratingSchema = (t: any) =>
	z.number({ message: t("rating.number") }).max(5, t("rating.max"))

const commentSchema = (max: number, t: any) =>
	z
		.string({ message: t("comment.string") })
		.max(max, {
			message: t("comment.max", { max })
		})
		.nonempty({ message: t("comment.empty") })

export const createReviewSchema = (t: any) =>
	z.object({
		comment: commentSchema(VALUES.MAX_REVIEW_LENGTH, t),
		rating: z.object({
			common: ratingSchema(t).min(1, t("rating.min")),
			taste: ratingSchema(t),
			aroma: ratingSchema(t),
			packaging: ratingSchema(t)
		})
	})

export const createCommentSchema = (t: any) =>
	z.object({
		comment: commentSchema(VALUES.MAX_COMMENT_LENGTH, t),
		replyId: z
			.string({ message: t("reviewId.string") })
			.uuid({ message: t("reviewId.uuid") })
			.optional()
	})

export type TCreateReviewSchema = {
	comment: string
	rating: {
		common: number
		taste: number
		aroma: number
		packaging: number
	}
}

export type TCreateCommentSchema = {
	comment: string
	replyId?: string
}
