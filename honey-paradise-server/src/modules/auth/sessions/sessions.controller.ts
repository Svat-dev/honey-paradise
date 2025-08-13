import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Delete, Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param, Req, Res } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { Recaptcha } from "@nestlab/google-recaptcha/decorators/recaptcha";
import type { Request, Response } from "express";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { VerificationService } from "../verification/verification.service";
import type { AuthLoginDto } from "./dto/auth-login.dto";
import type { AuthTfaDto } from "./dto/auth-tfa.dto";
import { SessionsService } from "./sessions.service";

@Controller(EnumApiRoute.AUTH)
export class SessionsController {
	constructor(
		private readonly sessionsService: SessionsService,
		private readonly verificationService: VerificationService
	) {}

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
	@Post(EnumApiRoute.SEND_TFA_CODE)
	sendTfaCode(@Req() req: Request, @UserAgent() userAgent: string) {
		return this.sessionsService.sendTFACode(req, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.VERIFY_TFA)
	verifyTfa(@Body() dto: AuthTfaDto, @Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.verificationService.verifyTFA(req, res, dto, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.LOGOUT)
	logout(@Req() req: Request) {
		return this.sessionsService.logout(req);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Delete(`${EnumApiRoute.REMOVE_SESSION}/:sid`)
	remove(@Param("sid") sid: string, @Req() req: Request) {
		return this.sessionsService.remove(req, sid);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Delete(EnumApiRoute.REMOVE_ALL_SESSIONS)
	removeAll(@Req() req: Request) {
		return this.sessionsService.removeAllSessions(req);
	}
}
