import { z } from "zod";
import { VALUES } from "../constants/base";

export const createPasswordResetSchema = (t: any) =>
	z.object({
		email: z.string({ message: "" }).nonempty("Введите эл. почту").email({ message: "Введите корректную эл. почту" }),
	});

export const createChangePasswordSchema = (t: any) =>
	z.object({
		password: z
			.string({ message: "" })
			.min(VALUES.MIN_PASSWORD_LENGTH, { message: "Минимальная длина пароля 8 символов" })
			.max(VALUES.MAX_PASSWORD_LENGTH, { message: "Максимальная длина пароля 24 символов" }),
	});

export type TPasswordResetFields = {
	email: string;
};

export type TPasswordChangeFields = {
	password: string;
};
