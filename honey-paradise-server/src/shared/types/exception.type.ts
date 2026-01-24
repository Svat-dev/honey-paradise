import type { HttpStatus } from "@nestjs/common/enums/http-status.enum"

export interface IException {
	message: string
	status: HttpStatus
	cause?: unknown

	timestamp?: string
	path?: string
}
