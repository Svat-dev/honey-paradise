import { ApiProperty } from "@nestjs/swagger"
import {
	IsNotEmpty,
	IsNumber,
	IsString,
	IsUUID,
	Length,
	Max,
	Min
} from "class-validator"

export class CreateReviewsDtoRating {
	@ApiProperty({ type: "number", example: 5, required: true })
	@IsNumber({ allowInfinity: false, allowNaN: false }, { message: "" })
	@Min(1, { message: "" })
	@Max(5, { message: "" })
	common: number

	@ApiProperty({ type: "number", example: 5, required: false })
	@IsNumber({ allowInfinity: false, allowNaN: false }, { message: "" })
	@Min(0, { message: "" })
	@Max(5, { message: "" })
	taste: number

	@ApiProperty({ type: "number", example: 5, required: false })
	@IsNumber({ allowInfinity: false, allowNaN: false }, { message: "" })
	@Min(0, { message: "" })
	@Max(5, { message: "" })
	aroma: number

	@ApiProperty({ type: "number", example: 5, required: false })
	@IsNumber({ allowInfinity: false, allowNaN: false }, { message: "" })
	@Min(0, { message: "" })
	@Max(5, { message: "" })
	packaging: number
}

export class CreateReviewsDto {
	@ApiProperty({ type: "string", example: "text" })
	@IsString({ message: "" })
	@Length(1, 500, { message: "" })
	text: string

	@ApiProperty({ type: "string", example: "uuid" })
	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@IsUUID(4, { message: "" })
	productId: string

	@ApiProperty({ type: CreateReviewsDtoRating })
	rating: CreateReviewsDtoRating
}
