import { EnumLanguages, EnumThemes, type User, type UserSettings } from "@prisma/client";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";

export class UpdateUserSettingsDto implements Partial<UserSettings & User> {
	@IsEnum(EnumLanguages, { message: "" })
	@IsOptional({ message: "" })
	defaultLanguage?: EnumLanguages;

	@IsEnum(EnumThemes, { message: "" })
	@IsOptional({ message: "" })
	defaultTheme?: EnumThemes;

	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	useFullLogout?: boolean;

	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	isTFAEnabled?: boolean;
}
