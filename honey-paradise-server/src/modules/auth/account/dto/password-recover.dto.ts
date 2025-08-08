import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

import { VALUES } from "src/shared/lib/common/constants";

export class UpdatePasswordAuthDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@MinLength(VALUES.MIN_PASSWORD_LENGTH, { message: "" })
	@MaxLength(VALUES.MAX_PASSWORD_LENGTH, { message: "" })
	password: string;
}

export class UpdatePasswordDto extends UpdatePasswordAuthDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@IsUUID(4, { message: "" })
	token: string;
}
