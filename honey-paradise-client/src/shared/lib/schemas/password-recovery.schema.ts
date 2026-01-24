import { z } from "zod"

import { VALUES } from "../constants/base"

const passwordSchema = (t: any) =>
	z
		.string({ message: "" })
		.nonempty(t("errors.empty"))
		.max(VALUES.MAX_PASSWORD_LENGTH, {
			message: t("errors.max", { max: VALUES.MAX_PASSWORD_LENGTH })
		})
		.min(VALUES.MIN_PASSWORD_LENGTH, {
			message: t("errors.min", { min: VALUES.MIN_PASSWORD_LENGTH })
		})

export const createPasswordResetSchema = (t: any) =>
	z.object({
		email: z
			.string({ message: "" })
			.nonempty(t("errors.empty"))
			.email({ message: t("errors.invalid") })
	})

export const createChangePasswordSchema = (t: any) =>
	z.object({
		password: passwordSchema(t)
	})

export const createChangeTwoPasswordSchema = (t: any) =>
	z
		.object({
			password: passwordSchema(t),
			confirmPassword: passwordSchema(t)
		})
		.refine(data => data.password === data.confirmPassword, {
			message: "Пароли должны совпадать",
			path: ["confirmPassword"]
		})

export type TPasswordResetFields = {
	email: string
}

export type TPasswordChangeFields = {
	password: string
}

export type TPasswordChangeTwoFields = {
	password: string
	confirmPassword: string
}
