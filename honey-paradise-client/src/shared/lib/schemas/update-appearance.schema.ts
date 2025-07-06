import { EnumThemes } from "@/shared/types/models";
import { z } from "zod";
import { EnumLanguages } from "../i18n";

export const createUpdateAppearanceSchema = () =>
	z.object({
		language: z.union([z.nativeEnum(EnumLanguages, { message: "" }).optional(), z.null({ message: "" }).optional()]),
		theme: z.union([z.nativeEnum(EnumThemes, { message: "" }).optional(), z.null({ message: "" }).optional()]),
	});

export type TUpdateAppearanceFields = {
	language?: EnumLanguages | null;
	theme?: EnumThemes | null;
};
