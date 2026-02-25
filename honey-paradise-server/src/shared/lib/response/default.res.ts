import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ApiProperty } from "@nestjs/swagger"

export class DefaultResponse {
	@ApiProperty({
		enum: HttpStatus,
		enumName: "HttpStatus",
		example: HttpStatus.OK
	})
	status: HttpStatus

	@ApiProperty({ type: "string", description: "", example: "Ok" })
	statusText: string

	@ApiProperty({ type: "string", description: "", example: "" })
	message: string
}

export class ErrorResponse extends DefaultResponse {
	@ApiProperty({
		type: "string",
		description: "",
		example: "Some reason",
		nullable: true
	})
	reason?: string
}
