import { ApiProperty } from "@nestjs/swagger";
import {
  EnumCurrencies,
  EnumLanguages,
  EnumThemes,
  type User,
  type UserSettings,
} from "@prisma/client";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";

export class UpdateUserSettingsDto implements Partial<UserSettings & User> {
  @ApiProperty({
    enum: EnumLanguages,
    description: "",
    example: EnumLanguages.en,
    required: false,
  })
  @IsEnum(EnumLanguages, { message: "" })
  @IsOptional()
  defaultLanguage?: EnumLanguages;

  @ApiProperty({
    enum: EnumThemes,
    description: "",
    example: EnumThemes.LIGHT,
    required: false,
  })
  @IsEnum(EnumThemes, { message: "" })
  @IsOptional()
  defaultTheme?: EnumThemes;

  @ApiProperty({
    enum: EnumCurrencies,
    description: "",
    example: EnumCurrencies.DOLLAR,
    required: false,
  })
  @IsEnum(EnumCurrencies, { message: "" })
  @IsOptional()
  defaultCurrency?: EnumCurrencies;

  @ApiProperty({
    type: "boolean",
    description: "",
    example: true,
    required: false,
  })
  @IsBoolean({ message: "" })
  @IsOptional()
  useFullLogout?: boolean;

  @ApiProperty({
    type: "boolean",
    description: "",
    example: true,
    required: false,
  })
  @IsBoolean({ message: "" })
  @IsOptional()
  isTFAEnabled?: boolean;

  @ApiProperty({
    type: "boolean",
    description: "",
    example: true,
    required: false,
  })
  @IsBoolean({ message: "" })
  @IsOptional()
  useTgTfaLogin?: boolean;
}
