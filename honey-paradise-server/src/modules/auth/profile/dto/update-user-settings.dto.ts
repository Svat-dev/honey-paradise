import { EnumLanguages, EnumThemes, type UserSettings } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateUserSettingsDto implements Partial<UserSettings> {
	@IsEnum(EnumLanguages, { message: "" })
	@IsOptional({ message: "" })
	defaultLanguage?: EnumLanguages;

	@IsEnum(EnumThemes, { message: "" })
	@IsOptional({ message: "" })
	defaultTheme?: EnumThemes;
}
