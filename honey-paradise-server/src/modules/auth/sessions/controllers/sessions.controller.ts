import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import {
	Delete,
	Get,
	Post
} from "@nestjs/common/decorators/http/request-mapping.decorator"
import {
	Param,
	Req
} from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger"
import { SkipThrottle } from "@nestjs/throttler/dist/throttler.decorator"
import type { Request } from "express"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"
import { DefaultResponse } from "src/shared/lib/response/default.res"

import { SessionsService } from "../sessions.service"

@ApiTags("Sessions")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.SESSION)
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	@ApiOperation({ summary: "Get all active sessions by user. Authorized only" })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.ALL)
	getAllByUser(@Req() req: Request) {
		return this.sessionsService.findByUser(req)
	}

	@ApiOperation({
		summary: "Get current active session by user. Authorized only"
	})
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.CURRENT_SESSION)
	getCurrent(@Req() req: Request) {
		return this.sessionsService.findCurrent(req)
	}

	@ApiOperation({ summary: "Clear current session cookie" })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.CLEAR)
	clearSession(@Req() req: Request) {
		return this.sessionsService.clearSession(req)
	}

	@ApiOperation({ summary: "Delete session by its id. Authorized only" })
	@ApiParam({ name: "sid", type: String })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Delete(EnumApiRoute.DELETE_SESSION)
	delete(@Param("sid") sid: string, @Req() req: Request) {
		return this.sessionsService.remove(req, sid)
	}

	@ApiOperation({ summary: "Delete all user's sessions. Authorized only" })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Delete(EnumApiRoute.DELETE_ALL)
	deleteAll(@Req() req: Request) {
		return this.sessionsService.removeAllSessions(req)
	}
}
