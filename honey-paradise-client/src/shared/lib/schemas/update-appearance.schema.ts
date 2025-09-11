import {
	GetMySettingsResponseDefaultCurrency,
	GetMySettingsResponseDefaultLanguage,
	GetMySettingsResponseDefaultTheme,
} from "@/shared/types/server";

import { z } from "zod";

export const createUpdateAppearanceSchema = () =>
	z.object({
		language: z.union([z.nativeEnum(GetMySettingsResponseDefaultLanguage, { message: "" }).optional(), z.null({ message: "" }).optional()]),
		theme: z.union([z.nativeEnum(GetMySettingsResponseDefaultTheme, { message: "" }).optional(), z.null({ message: "" }).optional()]),
		currency: z.union([z.nativeEnum(GetMySettingsResponseDefaultCurrency, { message: "" }).optional(), z.null({ message: "" }).optional()]),
	});

export type TUpdateAppearanceFields = {
	language?: GetMySettingsResponseDefaultLanguage | null;
	theme?: GetMySettingsResponseDefaultTheme | null;
	currency?: GetMySettingsResponseDefaultCurrency | null;
};
