import { ApiProperty } from "@nestjs/swagger"
import { ArrayNotEmpty, IsString, IsUUID } from "class-validator"

export class DeleteDiscountsDto {
	@ApiProperty({
		type: "string",
		example: ["uuid-1", "uuid-2", "..."],
		isArray: true
	})
	@ArrayNotEmpty({ message: "" })
	@IsString({ message: "", each: true })
	@IsUUID(4, { message: "", each: true })
	ids: string[]
}
