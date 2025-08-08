import { IsNotEmpty, IsString, Length } from "class-validator";

export class AuthTfaDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@Length(4, 4, { message: "" })
	token: string;
}
