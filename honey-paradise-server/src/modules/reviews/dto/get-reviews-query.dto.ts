import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export enum EnumReviewsSortType {
	OLDEST = "oldest",
	NEWEST = "newest",
	RATING = "rating",
}

export class GetReviewsQueryDto {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@IsUUID(4, { message: "" })
	pid: string;

	@ApiProperty({ type: "number", example: 5 })
	@IsNumberString({ locale: "ru-RU" }, { message: "" })
	@IsEnum(["1", "2", "3", "4", "5"], { message: "" })
	@IsOptional()
	rating?: string;

	@ApiProperty({ enum: EnumReviewsSortType, example: EnumReviewsSortType.NEWEST })
	@IsEnum(EnumReviewsSortType, { message: "" })
	@IsOptional()
	sort?: EnumReviewsSortType;
}
