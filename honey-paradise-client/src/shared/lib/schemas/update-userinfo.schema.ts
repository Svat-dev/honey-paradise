import { GetMeResponseGender } from "@/shared/types/server";
import { VALUES } from "@constants/base";
import { validateUsername } from "@utils/auth";
import { z } from "zod";

export const createUpdateUserinfoSchema = (t: any) =>
	z.object({
		username: z
			.string({ message: "" })
			.max(VALUES.MAX_ID_LENGTH, { message: t("errors.username.max", { max: VALUES.MAX_ID_LENGTH }) })
			.optional()
			.refine(data => (data ? data.length >= VALUES.MIN_ID_LENGTH : true), {
				message: t("errors.username.min", { min: VALUES.MIN_ID_LENGTH }),
			})
			.refine(validateUsername, { message: t("errors.username.invalid") }),
		phone: z
			.string({ message: "" })
			.optional()
			.refine(data => (data ? data.length >= VALUES.MIN_PHONE_LENGTH : true), { message: t("errors.phone.invalid") }),
		birthdate: z.date({ message: "" }).optional(),
		gender: z.nativeEnum(GetMeResponseGender, { message: "" }).optional(),
	});

export type TUpdateUserinfoFields = {
	username?: string;
	phone?: string;
	birthdate?: Date;
	gender?: GetMeResponseGender;
};
