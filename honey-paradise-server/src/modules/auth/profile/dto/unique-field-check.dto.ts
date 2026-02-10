import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class UniqueFieldCheckDto {
	@ApiProperty({
		type: "string",
		description: "",
		example: "username",
		required: true
	})
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	fieldValue: string
}
