import { z } from "zod"

export const createConfirmationSchema = (t: any, min: 4 | 6) =>
	z.object({
		pin: z
			.string({ message: "" })
			.nonempty(t("errors.empty"))
			.min(min, { message: t("errors.min", { min }) }),
		signInAfter: z.boolean({ message: "" }).optional()
	})

export type TConfirmationFields = {
	pin: string
	signInAfter?: boolean
}
