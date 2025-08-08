import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdateEmailDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@IsEmail({}, { message: "" })
	email: string;
}

export class EmailVerifyDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@Length(6, 6, { message: "" })
	token: string;

	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	isNeedAuth?: boolean;
}
