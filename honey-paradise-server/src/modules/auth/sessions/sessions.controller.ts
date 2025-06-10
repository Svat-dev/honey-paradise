import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Req } from "@nestjs/common/decorators/http/route-params.decorator";
import { Recaptcha } from "@nestlab/google-recaptcha";
import type { Request } from "express";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { SessionsService } from "./sessions.service";

@Controller("auth")
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	@HttpCode(200)
	@Recaptcha()
	@Post("sign-in")
	login(@Body() dto: AuthLoginDto, @Req() req: Request, @UserAgent() userAgent: string) {
		return this.sessionsService.login(dto, req, userAgent);
	}

	@HttpCode(200)
	@Authorization()
	@Post("logout")
	logout(@Req() req: Request) {
		return this.sessionsService.logout(req);
	}

	@HttpCode(200)
	@Post("clear-session")
	clearSession(@Req() req: Request) {
		return this.sessionsService.clearSession(req);
	}
}
