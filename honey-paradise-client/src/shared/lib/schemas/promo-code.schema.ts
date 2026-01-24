import { z } from "zod";

export const promoCodeSchema = z.object({
	promoCode: z
		.string({ message: "Поле вода должно быть строкой" })
		.nonempty({ message: "Поле ввода не должно быть пустым" })
		.max(30, { message: "Макс. количество символов 30" }),
});

export type TPromoCodeFields = {
	promoCode: string;
};
