import { validatePassword, validateUsername } from "@utils/auth";

import { VALUES } from "@constants/base";
import { z } from "zod";

const passwordSchema = (t: any) =>
	z
		.string({ message: "" })
		.min(VALUES.MIN_PASSWORD_LENGTH, { message: t("main_part.form.password.errors.min", { min: VALUES.MIN_PASSWORD_LENGTH }) })
		.max(VALUES.MAX_PASSWORD_LENGTH, { message: t("main_part.form.password.errors.max", { max: VALUES.MAX_PASSWORD_LENGTH }) })
		.refine(validatePassword, { message: t("main_part.form.confirmPassword.errors.invalid") });

const usernameSchema = (t: any) =>
	z
		.string({ message: "" })
		.max(VALUES.MAX_ID_LENGTH, { message: t("optional_part.form.username.errors.max", { max: VALUES.MAX_ID_LENGTH }) })
		.optional()
		.refine(data => (data ? data.length >= VALUES.MIN_ID_LENGTH : true), {
			message: t("optional_part.form.username.errors.min", { min: VALUES.MIN_ID_LENGTH }),
		})
		.refine(validateUsername, { message: t("optional_part.form.username.errors.invalid", { min: VALUES.MIN_ID_LENGTH }) });

export const createSignUpSchema = (t: any) =>
	z
		.object({
			email: z.string({ message: "" }).email({ message: t("main_part.form.email.errors.invalid") }),
			password: passwordSchema(t),
			confirmPassword: passwordSchema(t),
			username: usernameSchema(t),
			gender: z.enum(["male", "female", "other"], { message: "" }).optional(),
			birthdate: z.date({ message: "" }).optional(),
		})
		.refine(data => data.password === data.confirmPassword, {
			message: t("main_part.form.confirmPassword.errors.notMatch"),
			path: ["confirmPassword"],
		});

export type TGenders = "male" | "female" | "other";

export type TSignUpFields = {
	email: string;
	password: string;
	confirmPassword: string;
	username?: string;
	gender?: TGenders;
	birthdate?: Date;
};
