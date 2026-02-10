import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator"

export class CreateCommentDto {
	@ApiProperty({
		type: "string",
		description: "ID of the review to comment on",
		example: "123e4567-e89b-12d3-a456-426614174000"
	})
	@IsString({ message: "Review ID must be a string" })
	@IsNotEmpty({ message: "Review ID is required" })
	@IsUUID(4, { message: "Review ID must be a valid UUID" })
	reviewId: string

	@ApiProperty({
		type: "string",
		description: "Text of the comment",
		example: "I am agree with you"
	})
	@IsString({ message: "Comment text must be a string" })
	@IsNotEmpty({ message: "Comment text is required" })
	@MaxLength(255, { message: "Comment text must be less than 255 characters" })
	text: string
}
