import { EnumTokenTypes, type Token, type User } from "@prisma/client";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { hash, verify } from "argon2";
import type { Request, Response } from "express";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { MailService } from "src/core/mail/mail.service";
import { PrismaService } from "src/core/prisma/prisma.service";
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

		return { id: user.id };
	}

	async verifyTFA(res: Response, dto: AuthTfaDto) {
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

		res.clearCookie(EnumStorageKeys.CURRENT_EMAIL);

		return { id: user.id };
	}

	async verifyTelegramConnectToken(token: string, chatId: number) {
		const exitingTokens = await this.prisma.token.findMany({ where: { type: EnumTokenTypes.TELEGRAM_CONNECT } });
		const user = await this.validateToken(exitingTokens, token);

		await this.prisma.token.delete({
			where: { user_id_type: { userId: user.id, type: EnumTokenTypes.TELEGRAM_CONNECT } },
		});

		await this.userService.updateProfile(user.id, { telegramId: String(chatId) });

		return true;
	}

	async verifyTelegramAuthToken(dto: AuthTfaDto) {
		const exitingTokens = await this.prisma.token.findMany({ where: { type: EnumTokenTypes.TELEGRAM_TFA_AUTH } });
		const user = await this.validateToken(exitingTokens, dto.token);

		await this.prisma.token.delete({
			where: { user_id_type: { userId: user.id, type: EnumTokenTypes.TELEGRAM_TFA_AUTH } },
		});

		return { id: user.id };
	}

	async sendTelegramAuthToken(chatId: number) {
		const user = await this.userService.getProfile(String(chatId), "tg-id");
		if (!user) throw new NotFoundException(this.i18n.t("d.errors.account.telegram_not_connected"));

		const token = await this.createToken(user.id, EnumTokenTypes.TELEGRAM_TFA_AUTH, ms("10min"));

		return token;
	}

	async connectTelegram(userId: string): Promise<{ url: string }> {
		const user = await this.userService.getProfile(userId, "id");

		const token = await this.createToken(user.id, EnumTokenTypes.TELEGRAM_CONNECT, ms("30m"));

		const url = "https://t.me/honey_paradise_tg_bot?start=" + token;

		return { url };
	}

	async sendVerificationEmail(req: Request, userAgent: string, user: Pick<User, "id" | "email" | "username">): Promise<string> {
		const token = await this.createToken(user.id, EnumTokenTypes.EMAIL_VERIFY, ms("30m"));

		const metadata = getSessionMetadata(req, userAgent);

		await this.mailService.sendConfirmationMail(user.email, token, user.username, metadata);

		return token;
	}

	async sendTFACode(req: Request, userAgent: string, user: Pick<User, "id" | "email" | "username">): Promise<string> {
		const token = await this.createToken(user.id, EnumTokenTypes.TFA_VERIFY, ms("30m"));

		const metadata = getSessionMetadata(req, userAgent);

		await this.mailService.sendTFAEmail(user.email, token, user.username, metadata);

		return token;
	}

	async sendRecoverPasswordEmail(req: Request, res: Response, userAgent: string) {
		const email = await req.cookies[EnumStorageKeys.CURRENT_EMAIL];
		const user = await this.userService.getProfile(email, "email");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.account.not_found_email"));

		const token = await this.createToken(user.id, EnumTokenTypes.PASSWORD_RECOVERY, ms("30m"));

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

	private async createToken(userId: string, type: EnumTokenTypes, expiresTime: number): Promise<string> {
		const existingToken = await this.prisma.token.findUnique({
			where: { user_id_type: { userId, type } },
			select: { id: true },
		});

		if (existingToken) await this.prisma.token.delete({ where: { id: existingToken.id } });

		const token = this.generateAuthToken(type);
		const expiresIn = new Date(new Date().getTime() + expiresTime);

		await this.prisma.token.create({
			data: {
				userId,
				type,
				token: await hash(token),
				expiresIn,
			},
		});

		return token;
	}

	private generateAuthToken(type: EnumTokenTypes): string {
		let token: string = "";

		if (
			type === EnumTokenTypes.PASSWORD_RECOVERY ||
			type === EnumTokenTypes.TELEGRAM_CONNECT ||
			type === EnumTokenTypes.TELEGRAM_TFA_AUTH
		) {
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
