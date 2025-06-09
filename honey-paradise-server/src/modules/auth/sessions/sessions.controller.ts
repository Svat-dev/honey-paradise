import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Req } from "@nestjs/common/decorators/http/route-params.decorator";
import { Recaptcha } from "@nestlab/google-recaptcha";
import type { Request } from "express";
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
		const res = this.sessionsService.login(dto, req, userAgent);

		return res;
	}

	@HttpCode(200)
	@Get("logout")
	logout() {}
}
