import { IsNotEmpty, IsString, Length } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { VALUES } from "src/shared/lib/common/constants";

export class AuthLoginDto {
	@ApiProperty({ type: "string", description: "Email address or username", example: "john@example.com || john_doe52" })
	@IsString({ message: "" })
	@IsNotEmpty()
	id: string;

	@ApiProperty({ type: "string", description: "", example: "strong&password1234" })
	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@Length(VALUES.MIN_PASSWORD_LENGTH, VALUES.MAX_PASSWORD_LENGTH, { message: "" })
	password: string;
}
