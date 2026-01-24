import { z } from "zod"

export const createUpdateEmailSchema = (t: any) =>
	z.object({
		email: z.string().email(t("email.errors.invalid"))
	})

export type TUpdateEmailFields = {
	email: string
}
