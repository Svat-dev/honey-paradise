import { HttpStatus } from "@nestjs/common/enums/http-status.enum"

import type { DefaultResponse } from "../../response/default.res"

export function response(
	status: HttpStatus,
	message: string = "",
	statusText: string = "Ok"
): DefaultResponse {
	if (status >= 300) statusText = "Redirect"
	else if (status >= 400) statusText = "Client error"
	else if (status >= 500) statusText = "Server error"

	return {
		status,
		statusText,
		message
	}
}

export function success(message: string = "Ok"): DefaultResponse {
	return response(HttpStatus.OK, message, "Ok")
}
