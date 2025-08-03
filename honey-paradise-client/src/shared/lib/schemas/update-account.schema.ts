import { z } from "zod";

export const createUpdateAccountSchema = (t: any) =>
	z.object({
		email: z.string().email("Введите корректную эл. почту").optional(),
	});

export type TUpdateAccountFields = {
	email?: string;
};
