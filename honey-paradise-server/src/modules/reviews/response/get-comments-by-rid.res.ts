import { ApiProperty } from "@nestjs/swagger"

import { GetReviewsByPidResponseUser } from "./get-reviews-by-pid.res"

export class GetCommentsResponse {
	@ApiProperty({ type: "string", example: "uuid" })
	id: string

	@ApiProperty({ type: "string", example: "Some text" })
	text: string

	@ApiProperty({ type: "string", example: "uuid", nullable: true })
	replyToId: string | null

	@ApiProperty({ type: GetReviewsByPidResponseUser })
	user: GetReviewsByPidResponseUser
}
