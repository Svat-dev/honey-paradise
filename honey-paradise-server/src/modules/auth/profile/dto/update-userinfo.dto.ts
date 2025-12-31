import { IsDateString, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { EnumGenders, type User } from "@prisma/client";
import { USERNAME_REGEX, VALUES } from "src/shared/lib/common/constants";

export class UpdateUserDto implements Partial<User> {
	@ApiProperty({ type: "string", description: "", example: "70000000000", required: false })
	@IsString({ message: "" })
	@IsOptional()
	phoneNumber?: string;

	@ApiProperty({ type: "string", description: "", example: "john_doe52", required: false })
	@IsString({ message: "" })
	@MinLength(VALUES.MIN_ID_LENGTH, { message: "" })
	@MaxLength(VALUES.MAX_ID_LENGTH, { message: "" })
	@Matches(USERNAME_REGEX)
	@IsOptional()
	username?: string;

	@ApiProperty({ enum: EnumGenders, description: "", example: EnumGenders.OTHER, required: false })
	@IsEnum(EnumGenders, { message: "" })
	@IsOptional()
	gender?: EnumGenders;

	@ApiProperty({ description: "", example: new Date(), required: false })
	@IsDateString({}, { message: "" })
	@IsOptional()
	birthdate?: Date;
}
