import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Req, Res } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { Recaptcha } from "@nestlab/google-recaptcha/decorators/recaptcha";
import type { Request, Response } from "express";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { SessionsService } from "./sessions.service";

@Controller(EnumApiRoute.AUTH)
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.SESSION_BY_USER)
	getByUser(@Req() req: Request) {
		return this.sessionsService.findByUser(req);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.CURRENT_SESSION)
	getCurrent(@Req() req: Request) {
		return this.sessionsService.findCurrent(req);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.REMOVE_SESSION)
	remove(@Body() dto: { sid: string }, @Req() req: Request) {
		return this.sessionsService.remove(req, dto.sid);
	}

	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.CLEAR_SESSION)
	clearSession(@Req() req: Request) {
		return this.sessionsService.clearSession(req);
	}

	@HttpCode(HttpStatus.OK)
	@Recaptcha()
	@Post(EnumApiRoute.SIGN_IN)
	login(@Body() dto: AuthLoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.sessionsService.login(dto, req, res, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.LOGOUT)
	logout(@Req() req: Request) {
		return this.sessionsService.logout(req);
	}
}
