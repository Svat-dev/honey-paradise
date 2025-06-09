import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

import { EnumGenders, type User } from "@prisma/client";
import { USERNAME_REGEX, VALUES } from "src/shared/lib/common/constants";

export class CreateUserDto implements Partial<User> {
	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@IsEmail({}, { message: "" })
	email: string;

	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@MinLength(VALUES.MIN_PASSWORD_LENGTH, { message: "" })
	@MaxLength(VALUES.MAX_PASSWORD_LENGTH, { message: "" })
	password: string;

	@IsString({ message: "" })
	@MinLength(VALUES.MIN_ID_LENGTH, { message: "" })
	@MaxLength(VALUES.MAX_ID_LENGTH, { message: "" })
	@Matches(USERNAME_REGEX)
	@IsOptional()
	username?: string;

	@IsEnum(EnumGenders, { message: "" })
	@IsOptional()
	gender?: EnumGenders;

	@IsDateString({}, { message: "" })
	@IsOptional()
	birthdate?: Date;
}
