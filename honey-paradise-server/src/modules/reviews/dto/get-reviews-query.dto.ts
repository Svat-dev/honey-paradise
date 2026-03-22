import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength
} from "class-validator"
import { IsNumberArrayString } from "src/shared/decorators/is-number-array-string.decorator"

export enum EnumReviewsSortType {
	OLDEST = "oldest",
	NEWEST = "newest",
	RATING = "rating"
}

const ratings = ["1", "2", "3", "4", "5"]

export class GetReviewsQueryDto {
	@ApiProperty({ type: "string", description: "Search query", example: "" })
	@IsString({ message: "Search query must be a string" })
	@MaxLength(128, { message: "Search query must be less than 128 characters" })
	@IsOptional()
	q?: string

	@ApiProperty({
		type: "number",
		description: "Rating with which display reviews",
		example: 5
	})
	@IsString()
	@IsNumberArrayString({ allowedValues: ratings, unique: true })
	@IsOptional()
	rating?: number[]

	@ApiProperty({
		enum: EnumReviewsSortType,
		description: "Sorting type",
		example: EnumReviewsSortType.NEWEST
	})
	@IsEnum(EnumReviewsSortType, { message: "" })
	@IsOptional()
	sort?: EnumReviewsSortType

	@ApiProperty({ type: "number", description: "Page number", example: 1 })
	@IsNumber({}, { message: "Page must be a number" })
	@Transform(({ value }) => parseInt(value, 10))
	@IsOptional()
	page?: number
}

export const defaultReviewsQueryDto: GetReviewsQueryDto = {
	q: "",
	page: 1,
	rating: ratings.map(Number),
	sort: EnumReviewsSortType.RATING
}
