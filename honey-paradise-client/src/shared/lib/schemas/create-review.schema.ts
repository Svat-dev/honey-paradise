import { z } from "zod"

import { VALUES } from "../constants/base"

const ratingSchema = z
	.number({ message: "Поле должно быть числом" })
	.max(5, "Макс. значение 5")

export const createReviewSchema = z.object({
	comment: z
		.string({ message: "Поле должно быть строкой" })
		.max(VALUES.MAX_REVIEW_LENGTH, {
			message: `Длина комментария не должна превышать ${VALUES.MAX_REVIEW_LENGTH} символов`
		})
		.nonempty({ message: "Поле комментария не может быть пустым" }),
	rating: z.object({
		common: ratingSchema.min(1, "Заполните как минимум общий рейтинг"),
		taste: ratingSchema,
		aroma: ratingSchema,
		packaging: ratingSchema
	})
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
