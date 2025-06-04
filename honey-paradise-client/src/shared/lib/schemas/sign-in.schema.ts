import { validatePassword, validateUsername } from "@utils/auth";

import { z } from "zod";

const errors = {
	union: "Введите имя пользователя или почту",
	id: {
		min: "Минимальная длина идентификатора 3 символа",
		max: "Максимальная длина идентификатора 15 символов",
		invalid: "Имя пользователя может содержать только буквы, цифры и специальный символ _",
	},
	password: {
		min: "Пароль должен быть не менее 8 символов",
		max: "Максимальная длина пароля 24 символа",
		invalid: "Пароль должен содержать не менее 8 символов, хотя бы одну заглавную букву, цифру и только эти символы %&$#!.*^_-",
	},
};

export const signInSchema = z.object({
	id: z.union(
		[
			z
				.string()
				.min(3, { message: errors.id.min })
				.max(15, { message: errors.id.max })
				.refine(validateUsername, { message: errors.id.invalid }),
			z.string().email({ message: "" }),
		],
		{ message: errors.union }
	),

	password: z.string().min(8, { message: errors.password.min }).max(24, { message: errors.password.max }).refine(validatePassword, {
		message: errors.password.invalid,
	}),
});

export type TSignInFields = z.infer<typeof signInSchema>;
