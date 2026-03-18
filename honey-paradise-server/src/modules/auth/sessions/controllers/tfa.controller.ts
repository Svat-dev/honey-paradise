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
import type { Request, Response } from "express"
import { UserAgent } from "src/shared/decorators/user-agent.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"
import { ms } from "src/shared/lib/common/utils"
import { DefaultResponse } from "src/shared/lib/response/default.res"

import { AuthTfaDto } from "../dto/auth-tfa.dto"
import { SessionsService } from "../sessions.service"

@ApiTags("Two-factor Authentication")
@Controller(EnumApiRoute.AUTH)
export class SessionsController {
	constructor(private readonly sessionService: SessionsService) {}

	@ApiOperation({ summary: "Send a mail with confirm login code (xxxx)" })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.SEND_TFA_CODE)
	sendTfaCode(@Req() req: Request, @UserAgent() userAgent: string) {
		return this.sessionService.sendTFACode(req, userAgent)
	}

	@ApiOperation({ summary: "Check entered user's code to valid" })
	@ApiBody({ type: AuthTfaDto })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.VERIFY_TFA)
	verifyTfa(
		@Body() dto: AuthTfaDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@UserAgent() userAgent: string
	) {
		return this.sessionService.verifyTFAToken(dto, req, res, userAgent)
	}

	@ApiOperation({ summary: "Method to login via telegram bot" })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Throttle({ default: { limit: 10, ttl: ms("10min") } })
	@Post(EnumApiRoute.TG_TFA)
	tfaTgLogin(
		@Body() dto: AuthTfaDto,
		@Req() req: Request,
		@UserAgent() userAgent: string
	) {
		return this.sessionService.verifyTelegramTFAToken(dto, req, userAgent)
	}

	@ApiOperation({ summary: "Cancel auth via telegram bot" })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Throttle({ default: { limit: 10, ttl: ms("10min") } })
	@Post(EnumApiRoute.CANCEL_TG_TFA)
	cancelTfaTgLogin(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.sessionService.cancelTgTfaLogin(req, res)
	}
}
