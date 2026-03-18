import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumberString, IsOptional } from "class-validator"

export enum EnumReviewsSortType {
	OLDEST = "oldest",
	NEWEST = "newest",
	RATING = "rating"
}

export class GetReviewsQueryDto {
	@ApiProperty({ type: "number", example: 5 })
	@IsNumberString({ locale: "ru-RU" }, { message: "" })
	@IsEnum(["1", "2", "3", "4", "5"], { message: "" })
	@IsOptional()
	rating?: string

	@ApiProperty({
		enum: EnumReviewsSortType,
		example: EnumReviewsSortType.NEWEST
	})
	@IsEnum(EnumReviewsSortType, { message: "" })
	@IsOptional()
	sort?: EnumReviewsSortType
}
