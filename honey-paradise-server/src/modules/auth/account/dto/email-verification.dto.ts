import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UpdateEmailDto {
	@ApiProperty({ type: "string", description: "", example: "john@example.com" })
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@IsEmail({}, { message: "" })
	email: string;
}

export class EmailVerifyDto {
	@ApiProperty({ type: "string", description: "", example: "123456" })
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@Length(6, 6, { message: "" })
	token: string;

	@ApiProperty({ type: "boolean", description: "", example: false, required: false })
	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	isNeedAuth?: boolean;
}
