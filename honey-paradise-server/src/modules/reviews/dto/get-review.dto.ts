import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class GetReviewDto {
	@ApiProperty({ type: "string", example: "uuid" })
	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@IsUUID(4, { message: "" })
	productId: string
}
