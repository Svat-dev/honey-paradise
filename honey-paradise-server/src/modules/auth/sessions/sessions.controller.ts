import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Req, Res } from "@nestjs/common/decorators/http/route-params.decorator";
import { Recaptcha } from "@nestlab/google-recaptcha";
import type { Request, Response } from "express";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { SessionsService } from "./sessions.service";

@Controller("auth")
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	@HttpCode(200)
	@Authorization()
	@Get("session/by-user")
	getByUser(@Req() req: Request) {
		return this.sessionsService.findByUser(req);
	}

	@HttpCode(200)
	@Authorization()
	@Get("session/current")
	getCurrent(@Req() req: Request) {
		return this.sessionsService.findCurrent(req);
	}

	@HttpCode(200)
	@Authorization()
	@Post("session/remove")
	remove(@Body() dto: { sid: string }, @Req() req: Request) {
		return this.sessionsService.remove(req, dto.sid);
	}

	@HttpCode(200)
	@Recaptcha()
	@Post("sign-in")
	login(@Body() dto: AuthLoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.sessionsService.login(dto, req, res, userAgent);
	}

	@HttpCode(200)
	@Authorization()
	@Post("logout")
	logout(@Req() req: Request) {
		return this.sessionsService.logout(req);
	}

	@HttpCode(200)
	@Post("session/clear")
	clearSession(@Req() req: Request) {
		return this.sessionsService.clearSession(req);
	}
}
