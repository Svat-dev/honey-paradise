import { ApiProperty } from "@nestjs/swagger"

import { GetReviewsByPidResponseUser } from "./get-reviews-by-pid.res"

class GetCommentsResponseReply {
	@ApiProperty({ type: "string", example: "uuid" })
	id: string

	@ApiProperty({
		type: "string",
		description: "First 20 comment text chars",
		example: "Some text"
	})
	text: string
}

export class GetCommentsResponse {
	@ApiProperty({ type: "string", example: "uuid" })
	id: string

	@ApiProperty({ type: "string", example: "Some text" })
	text: string

	@ApiProperty({ type: GetCommentsResponseReply, nullable: true })
	reply: GetCommentsResponseReply | null

	@ApiProperty({ type: GetReviewsByPidResponseUser })
	user: GetReviewsByPidResponseUser

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}
