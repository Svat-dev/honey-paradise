import { EnumTokenTypes, type Token } from "@prisma/client";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import type { Request } from "express";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { MailService } from "src/core/mail/mail.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { TOKENS_LENGTH } from "src/shared/lib/common/constants";
import { ms } from "src/shared/lib/common/utils";
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util";
import { saveSession } from "src/shared/lib/common/utils/session.util";
import { EnumErrorCauses } from "src/shared/types/client/enums.type";
import { v4 as uuidv4 } from "uuid";
import type { EmailVerifyDto } from "../account/dto/email-verification.dto";
import type { UpdatePasswordDto } from "../account/dto/password-recover.dto";
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class VerificationService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly mailService: MailService,
		private readonly userService: ProfileService,
		private readonly i18n: I18nService
	) {}

	async verifyEmail(req: Request, dto: EmailVerifyDto, userAgent: string) {
		const { token, isNeedAuth } = dto;

		const existingToken = await this.prisma.token.findFirst({
			where: {
				token,
				type: EnumTokenTypes.EMAIL_VERIFY,
			},
		});

		const user = await this.validateToken(existingToken);

		await this.userService.updateProfileVerified(user.id);

		await this.prisma.token.delete({
			where: {
				userId: user.id,
				type: EnumTokenTypes.EMAIL_VERIFY,
			},
		});

		if (!isNeedAuth) return true;

		const metadata = getSessionMetadata(req, userAgent);
		await saveSession(req, user, metadata, this.i18n);

		return true;
	}

	async recoverPassword(dto: UpdatePasswordDto) {
		const { password, token } = dto;

		const existingToken = await this.prisma.token.findFirst({
			where: {
				token,
				type: EnumTokenTypes.PASSWORD_RECOVERY,
			},
		});

		if (!existingToken) throw new BadRequestException(this.i18n.t("d.errors.password_recovery_token_missing"));
		const user = await this.validateToken(existingToken);

		await this.userService.updateProfilePassword(user.id, password);

		await this.prisma.token.delete({
			where: {
				userId: user.id,
				type: EnumTokenTypes.PASSWORD_RECOVERY,
			},
		});

		return true;
	}

	async sendVerificationEmail(email: string) {
		const user = await this.userService.getProfile(email, "email");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.account_not_found_email"));

		const existingToken = await this.prisma.token.findFirst({
			where: { userId: user.id, type: EnumTokenTypes.EMAIL_VERIFY },
		});

		if (existingToken) await this.prisma.token.delete({ where: { id: existingToken.id } });

		const token = this.generateAuthToken(EnumTokenTypes.EMAIL_VERIFY);
		const expiresIn = new Date(new Date().getTime() + ms("30m"));

		await this.prisma.token.create({
			data: {
				userId: user.id,
				type: EnumTokenTypes.EMAIL_VERIFY,
				token,
				expiresIn,
			},
		});

		await this.mailService.sendConfirmationMail(user.email, token, user.username);

		return true;
	}

	async sendRecoverPasswordEmail(req: Request, userAgent: string, email: string) {
		const user = await this.userService.getProfile(email, "email");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.account_not_found_email"));

		const existingToken = await this.prisma.token.findFirst({
			where: { userId: user.id, type: EnumTokenTypes.PASSWORD_RECOVERY },
		});

		if (existingToken) await this.prisma.token.delete({ where: { id: existingToken.id } });

		const token = this.generateAuthToken(EnumTokenTypes.PASSWORD_RECOVERY);
		const expiresIn = new Date(new Date().getTime() + ms("30m"));

		await this.prisma.token.create({
			data: {
				userId: user.id,
				type: EnumTokenTypes.PASSWORD_RECOVERY,
				token,
				expiresIn,
			},
		});

		const metadata = getSessionMetadata(req, userAgent);

		await this.mailService.sendPasswordRecoveryMail(user.email, token, user.username, metadata);

		return true;
	}

	private async validateToken(token: Token) {
		if (!token) throw new NotFoundException(this.i18n.t("d.errors.invalid_code"));

		const isExpired = new Date(token.expiresIn).getTime() > new Date().getTime();

		if (!isExpired) throw new BadRequestException(this.i18n.t("d.errors.code_expired"), { cause: EnumErrorCauses.EMAIL_TOKEN_EXPIRED });

		const existingUser = await this.userService.getProfile(token.userId, "id");

		return existingUser;
	}

	private generateAuthToken(type: EnumTokenTypes): string {
		let token: string = "";

		if (type === EnumTokenTypes.PASSWORD_RECOVERY) {
			token = uuidv4();
		} else if (type === EnumTokenTypes.EMAIL_VERIFY) {
			for (let i = 0; i < TOKENS_LENGTH.EMAIL_VERIFY; i++) {
				const token_part = Math.floor(Math.random() * 10).toString();
				token += token_part;
			}
		} else if (type === EnumTokenTypes.TFA_VERIFY) {
			for (let i = 0; i < TOKENS_LENGTH.TFA_VERIFY; i++) {
				const token_part = Math.floor(Math.random() * 10).toString();
				token += token_part;
			}
		}

		return token;
	}
}
