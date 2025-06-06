import { validatePassword, validateUsername } from "@utils/auth";

import { VALUES } from "@constants/base";
import { z } from "zod";

export const createSignInSchema = (t: any) =>
	z.object({
		id: z.union(
			[
				z
					.string()
					.min(VALUES.MIN_ID_LENGTH, { message: t("form.id.errors.min", { min: VALUES.MIN_ID_LENGTH }) })
					.max(VALUES.MAX_ID_LENGTH, { message: t("form.id.errors.max", { max: VALUES.MAX_ID_LENGTH }) })
					.refine(validateUsername, { message: t("form.id.errors.invalid") }),
				z.string().email({ message: "" }),
			],
			{ message: t("form.id.errors.union") }
		),

		password: z
			.string()
			.min(VALUES.MIN_PASSWORD_LENGTH, { message: t("form.password.errors.min", { min: VALUES.MIN_ID_LENGTH }) })
			.max(VALUES.MAX_PASSWORD_LENGTH, { message: t("form.password.errors.max", { max: VALUES.MAX_ID_LENGTH }) })
			.refine(validatePassword, { message: "" }),
	});

export type TSignInFields = {
	id: string;
	password: string;
};
