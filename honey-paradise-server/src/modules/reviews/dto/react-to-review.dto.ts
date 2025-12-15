import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export enum ReactToReviewType {
	LIKE = "like",
	DISLIKE = "dislike",
}

export class ReactToReviewDto {
	@ApiProperty({ enum: ReactToReviewType, example: ReactToReviewType.LIKE })
	@IsNotEmpty({ message: "" })
	@IsEnum(ReactToReviewType, { message: "" })
	type: ReactToReviewType;

	@ApiProperty({ type: "string", example: "uuid" })
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@IsUUID(4, { message: "" })
	reviewId: string;
}
