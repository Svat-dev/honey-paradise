import { ApiProperty } from "@nestjs/swagger";
import { EnumLanguages, EnumThemes, type User, type UserSettings } from "@prisma/client";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";

export class UpdateUserSettingsDto implements Partial<UserSettings & User> {
	@ApiProperty({ enum: EnumLanguages, description: "", example: EnumLanguages.en, required: false })
	@IsEnum(EnumLanguages, { message: "" })
	@IsOptional({ message: "" })
	defaultLanguage?: EnumLanguages;

	@ApiProperty({ enum: EnumThemes, description: "", example: EnumThemes.LIGHT, required: false })
	@IsEnum(EnumThemes, { message: "" })
	@IsOptional({ message: "" })
	defaultTheme?: EnumThemes;

	@ApiProperty({ type: "boolean", description: "", example: true, required: false })
	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	useFullLogout?: boolean;

	@ApiProperty({ type: "boolean", description: "", example: true, required: false })
	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	isTFAEnabled?: boolean;

	@ApiProperty({ type: "boolean", description: "", example: true, required: false })
	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	useTgTfaLogin?: boolean;
}
