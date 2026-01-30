import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator"

export class ReplyToCommentDto {
	@ApiProperty({
		type: "string",
		description: "ID of the comment to reply to",
		example: "123e4567-e89b-12d3-a456-426614174000"
	})
	@IsString({ message: "Comment ID must be a string" })
	@IsNotEmpty({ message: "Comment ID is required" })
	@IsUUID(4, { message: "Comment ID must be a valid UUID" })
	commentId: string

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
