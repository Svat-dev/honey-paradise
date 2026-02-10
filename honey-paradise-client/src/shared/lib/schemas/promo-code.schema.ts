import { z } from "zod"

import { VALUES } from "../constants/base"

export const promoCodeSchema = z.object({
	promoCode: z
		.string({ message: "Поле вода должно быть строкой" })
		.nonempty({ message: "Поле ввода не должно быть пустым" })
		.max(VALUES.MAX_PROMO_CODE_LENGTH, {
			message: `Макс. количество символов - ${VALUES.MAX_PROMO_CODE_LENGTH}`
		})
})

export type TPromoCodeFields = {
	promoCode: string
}
