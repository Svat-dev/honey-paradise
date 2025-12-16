import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { CreateReviewsDtoRating } from "./create-review.dto";

export class UpdateReviewDto {
	@ApiProperty({ type: "string", example: "uuid", required: false })
	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@IsUUID(4, { message: "" })
	@IsOptional()
	reviewId?: string;

	@ApiProperty({ type: "string", example: "text", required: false })
	@IsString({ message: "" })
	@Length(1, 500, { message: "" })
	@IsOptional()
	text?: string;

	@ApiProperty({ type: CreateReviewsDtoRating, required: false })
	rating?: CreateReviewsDtoRating;
}
