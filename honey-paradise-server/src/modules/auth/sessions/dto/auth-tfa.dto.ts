import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class AuthTfaDto {
	@ApiProperty({ type: "string", description: "", example: "1234" })
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@Length(4, 4, { message: "" })
	token: string
}
