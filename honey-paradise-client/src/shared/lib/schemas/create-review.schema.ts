import { z } from "zod"

import { VALUES } from "../constants/base"

const ratingSchema = z
	.number({ message: "Поле должно быть числом" })
	.max(5, "Макс. значение 5")

const commentSchema = (max: number) =>
	z
		.string({ message: "Поле должно быть строкой" })
		.max(max, {
			message: `Длина комментария не должна превышать ${max} символов`
		})
		.nonempty({ message: "Поле комментария не может быть пустым" })

export const createReviewSchema = z.object({
	comment: commentSchema(VALUES.MAX_REVIEW_LENGTH),
	rating: z.object({
		common: ratingSchema.min(1, "Заполните как минимум общий рейтинг"),
		taste: ratingSchema,
		aroma: ratingSchema,
		packaging: ratingSchema
	})
})

export const createCommentSchema = z.object({
	comment: commentSchema(VALUES.MAX_COMMENT_LENGTH),
	replyId: z
		.string({ message: "ID должен быть строкой!" })
		.uuid({ message: "ID должен быть правильным UUID 4 версии!" })
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
