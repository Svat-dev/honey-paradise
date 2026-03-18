import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator"
import {
	Body,
	Req,
	Res
} from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { Throttle } from "@nestjs/throttler/dist/throttler.decorator"
import { Recaptcha } from "@nestlab/google-recaptcha/decorators/recaptcha"
import type { Request, Response } from "express"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { UserAgent } from "src/shared/decorators/user-agent.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"
import { ms } from "src/shared/lib/common/utils"
import { DefaultResponse } from "src/shared/lib/response/default.res"

import { AuthLoginDto } from "./sessions/dto/auth-login.dto"
import { SessionsService } from "./sessions/sessions.service"

@ApiTags("Authentication")
@Controller(EnumApiRoute.AUTH)
export class AuthController {
	constructor(private readonly sessionService: SessionsService) {}

	@ApiOperation({ summary: "Login to user account. (Authorization)" })
	@ApiBody({ type: AuthLoginDto })
	@HttpCode(HttpStatus.OK)
	@Recaptcha()
	@Throttle({ default: { limit: 10, ttl: ms("10min") } })
	@Post(EnumApiRoute.SIGN_IN)
	login(
		@Body() dto: AuthLoginDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@UserAgent() userAgent: string
	) {
		return this.sessionService.login(dto, req, res, userAgent)
	}

	@ApiOperation({ summary: "Logout from current account. Authorized only" })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.LOGOUT)
	logout(@Req() req: Request) {
		return this.sessionService.logout(req)
	}
}
