import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class EmailVerificationDto {
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
}
