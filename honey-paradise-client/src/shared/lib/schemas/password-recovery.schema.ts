import { z } from "zod";
import { VALUES } from "../constants/base";

export const createPasswordResetSchema = (t: any) =>
	z.object({
		email: z
			.string({ message: "" })
			.nonempty(t("errors.empty"))
			.email({ message: t("errors.invalid") }),
	});

export const createChangePasswordSchema = (t: any) =>
	z.object({
		password: z
			.string({ message: "" })
			.nonempty(t("errors.empty"))
			.max(VALUES.MAX_PASSWORD_LENGTH, { message: t("errors.max", { max: VALUES.MAX_PASSWORD_LENGTH }) })
			.min(VALUES.MIN_PASSWORD_LENGTH, { message: t("errors.min", { min: VALUES.MIN_PASSWORD_LENGTH }) }),
	});

export type TPasswordResetFields = {
	email: string;
};

export type TPasswordChangeFields = {
	password: string;
};
