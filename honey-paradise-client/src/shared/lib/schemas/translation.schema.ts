import { z } from "zod"

export const translationSchema = z.object({
	reviewId: z
		.string({ message: "Review ID must be a string!" })
		.nonempty({ message: "Review ID must not be empty!" })
		.uuid({ message: "Review ID must be a valid uuid!" }),
	text: z
		.string({ message: "Text must be string!" })
		.nonempty({ message: "Text must not be empty!" })
		.max(500, { message: "Text is too long" })
})
