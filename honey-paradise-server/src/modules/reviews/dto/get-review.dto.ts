import { IsNotEmpty, IsString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class GetReviewDto {
	@ApiProperty({ type: "string", example: "uuid" })
	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@IsUUID(4, { message: "" })
	productId: string;
}
