import { EnumGenders } from "@/shared/types/models";
import { VALUES } from "@constants/base";
import { validateUsername } from "@utils/auth";
import { z } from "zod";

export const createUpdateUserinfoSchema = (t: any) =>
	z.object({
		username: z
			.string({ message: "" })
			.max(VALUES.MAX_ID_LENGTH, { message: "username max" })
			.optional()
			.refine(data => (data ? data.length >= VALUES.MIN_ID_LENGTH : true), { message: "username min" })
			.refine(validateUsername, { message: "username invalid" }),
		phone: z
			.string({ message: "" })
			.optional()
			.refine(data => (data ? data.length >= VALUES.MIN_PHONE_LENGTH : true), { message: "phone min" }),
		birthdate: z.date({ message: "" }).optional(),
		gender: z.nativeEnum(EnumGenders, { message: "" }).optional(),
	});

export type TUpdateUserinfoFields = {
	username?: string;
	phone?: string;
	birthdate?: Date;
	gender?: EnumGenders;
};
