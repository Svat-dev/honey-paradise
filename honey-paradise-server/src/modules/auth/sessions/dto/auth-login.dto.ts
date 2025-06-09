import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

import { VALUES } from "src/shared/lib/common/constants";

export class AuthLoginDto {
	@IsString({ message: "" })
	@IsNotEmpty()
	id: string;

	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@MinLength(VALUES.MIN_PASSWORD_LENGTH, { message: "" })
	@MaxLength(VALUES.MAX_PASSWORD_LENGTH, { message: "" })
	password: string;
}
