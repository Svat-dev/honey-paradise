import { z } from "zod";

const ratingSchema = z.number({ message: "Поле должно быть числом" }).max(5, "Макс. значение 5");

export const createReviewSchema = z.object({
	comment: z
		.string({ message: "Поле должно быть строкой" })
		.max(500, { message: "Длина комментария не должна превышать 500 символов" })
		.nonempty({ message: "Поле комментария не может быть пустым" }),
	rating: z.object({
		common: ratingSchema.min(1, "Заполните как минимум общий рейтинг"),
		taste: ratingSchema,
		aroma: ratingSchema,
		packaging: ratingSchema,
	}),
});

export type TCreateReviewSchema = {
	comment: string;
	rating: {
		common: number;
		taste: number;
		aroma: number;
		packaging: number;
	};
};
