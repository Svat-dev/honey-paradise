import { z } from "zod";

export const createConfirmationSchema = (t: any, min: 4 | 6) =>
	z.object({
		pin: z
			.string({ message: "" })
			.nonempty("Введите пин-код")
			.min(min, { message: `Минимальная длина пин-кода ${min} символа` }),
		signInAfter: z.boolean({ message: "" }).optional(),
	});

export type TConfirmationFields = {
	pin: string;
	signInAfter?: boolean;
};
