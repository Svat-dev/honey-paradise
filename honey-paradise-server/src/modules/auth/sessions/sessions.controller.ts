import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Delete, Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param, Req, Res } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SkipThrottle, Throttle } from "@nestjs/throttler/dist/throttler.decorator";
import { Recaptcha } from "@nestlab/google-recaptcha/decorators/recaptcha";
import type { Request, Response } from "express";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { ms } from "src/shared/lib/common/utils";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthTfaDto } from "./dto/auth-tfa.dto";
import { SessionsService } from "./sessions.service";

@ApiTags("Authentication")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.AUTH)
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	@ApiOperation({ summary: "Get all active sessions by user. Authorized only" })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.SESSION_BY_USER)
	getByUser(@Req() req: Request) {
		return this.sessionsService.findByUser(req);
	}

	@ApiOperation({ summary: "Get current active session by user. Authorized only" })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.CURRENT_SESSION)
	getCurrent(@Req() req: Request) {
		return this.sessionsService.findCurrent(req);
	}

	@ApiOperation({ summary: "Clear current session cookie" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.CLEAR_SESSION)
	clearSession(@Req() req: Request) {
		return this.sessionsService.clearSession(req);
	}

	@ApiOperation({ summary: "Login to user account. (Authorization)" })
	@ApiBody({ type: AuthLoginDto })
	@HttpCode(HttpStatus.OK)
	@Recaptcha()
	@Throttle({ default: { limit: 10, ttl: ms("10min") } })
	@Post(EnumApiRoute.SIGN_IN)
	login(@Body() dto: AuthLoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.sessionsService.login(dto, req, res, userAgent);
	}

	@ApiOperation({ summary: "Method to login via telegram bot" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Throttle({ default: { limit: 10, ttl: ms("10min") } })
	@Post(EnumApiRoute.TG_TFA_LOGIN)
	tfaTgLogin(@Req() req: Request, @UserAgent() userAgent: string) {
		return this.sessionsService.verifyTelegramTFAToken(req, userAgent);
	}

	@ApiOperation({ summary: "Cancel auth via telegram bot" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Throttle({ default: { limit: 10, ttl: ms("10min") } })
	@Post(EnumApiRoute.CANCEL_TG_TFA_LOGIN)
	cancelTfaTgLogin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return this.sessionsService.cancelTgTfaLogin(req, res);
	}

	@ApiOperation({ summary: "Send a mail with confirm login code (xxxx)" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.SEND_TFA_CODE)
	sendTfaCode(@Req() req: Request, @UserAgent() userAgent: string) {
		return this.sessionsService.sendTFACode(req, userAgent);
	}

	@ApiOperation({ summary: "Check entered user's code to valid" })
	@ApiBody({ type: AuthTfaDto })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.VERIFY_TFA)
	verifyTfa(@Body() dto: AuthTfaDto, @Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.sessionsService.verifyTFAToken(dto, req, res, userAgent);
	}

	@ApiOperation({ summary: "Logout from current account. Authorized only" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.LOGOUT)
	logout(@Req() req: Request) {
		return this.sessionsService.logout(req);
	}

	@ApiOperation({ summary: "Remove session by its id. Authorized only" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Delete(`${EnumApiRoute.REMOVE_SESSION}/:sid`)
	remove(@Param("sid") sid: string, @Req() req: Request) {
		return this.sessionsService.remove(req, sid);
	}

	@ApiOperation({ summary: "Remove all user's sessions. Authorized only" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Delete(EnumApiRoute.REMOVE_ALL_SESSIONS)
	removeAll(@Req() req: Request) {
		return this.sessionsService.removeAllSessions(req);
	}
}
