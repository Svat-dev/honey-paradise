import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Req } from "@nestjs/common/decorators/http/route-params.decorator";
import { Recaptcha } from "@nestlab/google-recaptcha/decorators/recaptcha";
import { Request } from "express";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { VerificationService } from "../verification/verification.service";
import { AccountService } from "./account.service";
import type { CreateUserDto } from "./dto/create-user.dto";
import { EmailVerificationDto, EmailVerifyDto } from "./dto/email-verification.dto";

@Controller("auth/account")
export class AccountController {
	constructor(
		private readonly accountService: AccountService,
		private readonly verificationService: VerificationService
	) {}

	@HttpCode(200)
	@Recaptcha()
	@Post("create")
	createAccount(@Body() dto: CreateUserDto) {
		return this.accountService.create(dto);
	}

	@HttpCode(200)
	@Authorization()
	@Get("me")
	getMe(@Authorized("id") id: string) {
		return this.accountService.me(id);
	}

	@HttpCode(200)
	@Post("email/send-code")
	sendEmailVerification(@Body() dto: EmailVerificationDto) {
		const { email } = dto;

		return this.verificationService.sendVerificationEmail(email);
	}

	@HttpCode(200)
	@Post("email/verify")
	verifyEmail(@Body() dto: EmailVerifyDto, @Req() req: Request, @UserAgent() userAgent: string) {
		const { token } = dto;

		return this.verificationService.verifyEmail(req, token, userAgent);
	}
}
