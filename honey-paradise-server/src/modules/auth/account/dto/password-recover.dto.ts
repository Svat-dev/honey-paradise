import { IsEmail, IsNotEmpty, IsString, IsUUID, Max, Min } from "class-validator";

import { VALUES } from "src/shared/lib/common/constants";

export class PasswordRecoverDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@IsEmail({}, { message: "" })
	email: string;
}

export class UpdatePasswordDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@Min(VALUES.MIN_PASSWORD_LENGTH, { message: "" })
	@Max(VALUES.MAX_PASSWORD_LENGTH, { message: "" })
	password: string;

	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@IsUUID(4, { message: "" })
	token: string;
}
