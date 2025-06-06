import { validatePassword, validateUsername } from "@utils/auth";

import { VALUES } from "@constants/base";
import { z } from "zod";

const passwordSchema = z
	.string({ message: "" })
	.min(VALUES.MIN_PASSWORD_LENGTH, { message: "min 8" })
	.max(VALUES.MAX_PASSWORD_LENGTH, { message: "max 24" })
	.refine(validatePassword, { message: "invalid password" });

export const createSignUpSchema = (t: any) =>
	z
		.object({
			email: z.string({ message: "" }).email({ message: "not email" }),
			password: passwordSchema,
			confirmPassword: passwordSchema,
			username: z.union([
				z.string().optional(),
				z
					.string({ message: "" })
					.min(VALUES.MIN_ID_LENGTH, { message: "min 3" })
					.max(VALUES.MAX_ID_LENGTH, { message: "max 12" })
					.refine(validateUsername, { message: "invalid username" }),
			]),
			gender: z.enum(["male", "female", "other"], { message: "invalid gender" }).optional(),
			birthdate: z.string().date("").optional(),
		})
		.refine(data => data.password === data.confirmPassword, {
			message: "passwords don't match",
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
