import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class PasswordRecoverDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@IsEmail({}, { message: "" })
	email: string;
}
