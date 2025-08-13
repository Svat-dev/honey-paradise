import { EnumNotificationType, EnumTokenTypes, type Token } from "@prisma/client";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { hash, verify } from "argon2";
import type { Request, Response } from "express";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { MailService } from "src/core/mail/mail.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { NotificationsService } from "src/modules/notifications/notifications.service";
import { TOKENS_LENGTH } from "src/shared/lib/common/constants";
import { ms } from "src/shared/lib/common/utils";
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util";
import { saveSession } from "src/shared/lib/common/utils/session.util";
import { EnumErrorCauses, EnumStorageKeys } from "src/shared/types/client/enums.type";
import { v4 as uuidv4 } from "uuid";
import type { EmailVerifyDto } from "../account/dto/email-verification.dto";
import type { UpdatePasswordDto } from "../account/dto/password-recover.dto";
import { ProfileService } from "../profile/profile.service";
import type { AuthTfaDto } from "../sessions/dto/auth-tfa.dto";

@Injectable()
export class VerificationService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly mailService: MailService,
		private readonly userService: ProfileService,
		private readonly notificationsService: NotificationsService,
		private readonly i18n: I18nService
	) {}

	async verifyEmail(req: Request, res: Response, dto: EmailVerifyDto, userAgent: string) {
		const { token, isNeedAuth } = dto;

		const existingTokens = await this.prisma.token.findMany({ where: { type: EnumTokenTypes.EMAIL_VERIFY } });

		const user = await this.validateToken(existingTokens, token);

		await this.userService.updateProfileVerified(user.id);

		await this.prisma.token.delete({
			where: {
				user_id_type: {
					userId: user.id,
					type: EnumTokenTypes.EMAIL_VERIFY,
				},
			},
		});

		res.clearCookie(EnumStorageKeys.CURRENT_EMAIL);

		if (!isNeedAuth) return true;

		const metadata = getSessionMetadata(req, userAgent);
		await saveSession(req, user, metadata, this.i18n);

		return true;
	}

	async recoverPassword(dto: UpdatePasswordDto) {
		const { password, token } = dto;

		const existingTokens = await this.prisma.token.findMany({ where: { type: EnumTokenTypes.PASSWORD_RECOVERY } });

		const user = await this.validateToken(existingTokens, token, "password-recover");

		await this.userService.updatePassword(user.id, password);

		await this.prisma.token.delete({
			where: {
				user_id_type: {
					userId: user.id,
					type: EnumTokenTypes.PASSWORD_RECOVERY,
				},
			},
		});

		return true;
	}

	async verifyTFA(req: Request, res: Response, dto: AuthTfaDto, userAgent: string) {
		const { token } = dto;

		const existingTokens = await this.prisma.token.findMany({ where: { type: EnumTokenTypes.TFA_VERIFY } });

		const user = await this.validateToken(existingTokens, token);

		await this.prisma.token.delete({
			where: {
				user_id_type: {
					userId: user.id,
					type: EnumTokenTypes.TFA_VERIFY,
				},
			},
		});

		await this.notificationsService.send(user.id, "На ваш аккаунт только что был совершен вход", EnumNotificationType.ACCOUNT_STATUS);

		res.clearCookie(EnumStorageKeys.CURRENT_EMAIL);

		const metadata = getSessionMetadata(req, userAgent);
		return saveSession(req, user, metadata, this.i18n);
	}

	async sendVerificationEmail(req: Request, userAgent: string) {
		const email = req.cookies[EnumStorageKeys.CURRENT_EMAIL];
		const user = await this.userService.getProfile(email, "email");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.account.not_found_email"));

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
				token: await hash(token),
				expiresIn,
			},
		});

		const metadata = getSessionMetadata(req, userAgent);

		await this.mailService.sendConfirmationMail(user.email, token, user.username, metadata);

		return true;
	}

	async sendTFAEmail(req: Request, userAgent: string, email: string) {
		const user = await this.userService.getProfile(email, "email");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.account.not_found_email"));

		const existingToken = await this.prisma.token.findFirst({
			where: { userId: user.id, type: EnumTokenTypes.TFA_VERIFY },
		});

		if (existingToken) await this.prisma.token.delete({ where: { id: existingToken.id } });

		const token = this.generateAuthToken(EnumTokenTypes.TFA_VERIFY);
		const expiresIn = new Date(new Date().getTime() + ms("30m"));

		await this.prisma.token.create({
			data: {
				userId: user.id,
				type: EnumTokenTypes.TFA_VERIFY,
				token: await hash(token),
				expiresIn,
			},
		});

		const metadata = getSessionMetadata(req, userAgent);

		await this.mailService.sendTFAEmail(user.email, token, user.username, metadata);

		return true;
	}

	async sendRecoverPasswordEmail(req: Request, res: Response, userAgent: string) {
		const email = req.cookies[EnumStorageKeys.CURRENT_EMAIL];
		const user = await this.userService.getProfile(email, "email");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.account.not_found_email"));

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
				token: await hash(token),
				expiresIn,
			},
		});

		res.clearCookie(EnumStorageKeys.CURRENT_EMAIL);

		const metadata = getSessionMetadata(req, userAgent);
		await this.mailService.sendPasswordRecoveryMail(user.email, token, user.username, metadata);

		return true;
	}

	private async validateToken(tokens: Token[], code: string, type: "default" | "password-recover" = "default") {
		let token: Token | null = null;

		for (const item of tokens) {
			const result = await verify(item.token, code);

			if (result) {
				token = item;
				break;
			}
		}

		if (!token) {
			if (type === "default") {
				throw new BadRequestException(this.i18n.t("d.errors.verification.invalid_code"));
			} else {
				throw new BadRequestException(this.i18n.t("d.errors.verification.password_recovery_token_missing"));
			}
		}

		const isExpired = new Date(token.expiresIn).getTime() > new Date().getTime();

		if (!isExpired)
			throw new BadRequestException(this.i18n.t("d.errors.verification.code_expired"), { cause: EnumErrorCauses.EMAIL_TOKEN_EXPIRED });

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
