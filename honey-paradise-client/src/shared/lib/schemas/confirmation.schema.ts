import { z } from "zod";

export const createConfirmationSchema = (t: any, min: 4 | 6) =>
	z.object({
		pin: z
			.string({ message: "" })
			.nonempty(t("email.errors.empty"))
			.min(min, { message: t("email.errors.min", { min }) }),
		signInAfter: z.boolean({ message: "" }).optional(),
	});

export type TConfirmationFields = {
	pin: string;
	signInAfter?: boolean;
};
