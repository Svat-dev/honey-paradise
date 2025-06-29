import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Patch, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Req, Res } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { Recaptcha } from "@nestlab/google-recaptcha/decorators/recaptcha";
import type { Request, Response } from "express";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { VerificationService } from "../verification/verification.service";
import { AccountService } from "./account.service";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { EmailVerificationDto, EmailVerifyDto } from "./dto/email-verification.dto";
import type { PasswordRecoverDto, UpdatePasswordDto } from "./dto/password-recover.dto";

@Controller(EnumApiRoute.ACCOUNT)
export class AccountController {
	constructor(
		private readonly accountService: AccountService,
		private readonly verificationService: VerificationService
	) {}

	@HttpCode(HttpStatus.OK)
	@Recaptcha()
	@Post(EnumApiRoute.CREATE)
	createAccount(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
		return this.accountService.create(dto, res);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.ME)
	getMe(@Authorized("id") id: string) {
		return this.accountService.me(id);
	}

	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.SEND_VERIFICATION_CODE)
	sendEmailVerification(@Body() dto: EmailVerificationDto) {
		const { email } = dto;

		return this.verificationService.sendVerificationEmail(email);
	}

	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.VERIFY_EMAIL)
	verifyEmail(@Body() dto: EmailVerifyDto, @Req() req: Request, @UserAgent() userAgent: string) {
		return this.verificationService.verifyEmail(req, dto, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.RESET_PASSWORD)
	resetPassword(@Body() dto: PasswordRecoverDto, @Req() req: Request, @UserAgent() userAgent: string) {
		return this.verificationService.sendRecoverPasswordEmail(req, userAgent, dto.email);
	}

	@HttpCode(HttpStatus.OK)
	@Patch(EnumApiRoute.RECOVER_PASSWORD)
	recoverPassword(@Body() dto: UpdatePasswordDto) {
		return this.verificationService.recoverPassword(dto);
	}
}
