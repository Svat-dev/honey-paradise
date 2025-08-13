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
import type { EmailVerifyDto, UpdateEmailDto } from "./dto/email-verification.dto";
import type { UpdatePasswordAuthDto, UpdatePasswordDto } from "./dto/password-recover.dto";

@Controller(EnumApiRoute.ACCOUNT)
export class AccountController {
	constructor(
		private readonly accountService: AccountService,
		private readonly verificationService: VerificationService
	) {}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.ME)
	getMe(@Authorized("id") id: string) {
		return this.accountService.me(id);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(`${EnumApiRoute.ME}/id`)
	getMeField(@Authorized("id") id: string) {
		return { userId: id };
	}

	@HttpCode(HttpStatus.OK)
	@Recaptcha()
	@Post(EnumApiRoute.CREATE)
	createAccount(
		@Body() dto: CreateUserDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@UserAgent() userAgent: string
	) {
		return this.accountService.create(dto, req, res, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.UPDATE_EMAIL)
	updateEmail(@Authorized("id") id: string, @Body() dto: UpdateEmailDto) {
		const { email } = dto;

		return this.accountService.changeEmail(id, email);
	}

	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.SEND_VERIFICATION_CODE)
	sendEmailVerification(@Req() req: Request, @UserAgent() userAgent: string) {
		return this.verificationService.sendVerificationEmail(req, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.VERIFY_EMAIL)
	verifyEmail(@Body() dto: EmailVerifyDto, @Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.verificationService.verifyEmail(req, res, dto, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Post(EnumApiRoute.RESET_PASSWORD)
	resetPassword(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.verificationService.sendRecoverPasswordEmail(req, res, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.UPDATE_PASSWORD)
	updatePassword(@Authorized("id") id: string, @Body() dto: UpdatePasswordAuthDto, @Req() req: Request) {
		const { password } = dto;

		return this.accountService.updatePassword(id, password, req);
	}

	@HttpCode(HttpStatus.OK)
	@Patch(EnumApiRoute.RECOVER_PASSWORD)
	recoverPassword(@Body() dto: UpdatePasswordDto) {
		return this.verificationService.recoverPassword(dto);
	}
}
