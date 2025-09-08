import { EnumNotificationType, EnumTokenTypes } from "@prisma/client";
import type { Request, Response } from "express";
import { destroySession, saveSession } from "src/shared/lib/common/utils/session.util";
import { EnumClientRoutes, EnumErrorCauses, EnumStorageKeys } from "src/shared/types/client/enums.type";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { verify } from "argon2";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { RedisService } from "src/core/redis/redis.service";
import { TelegramService } from "src/core/telegram/telegram.service";
import { NotificationsService } from "src/modules/notifications/notifications.service";
import { ms } from "src/shared/lib/common/utils";
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util";
import { userServerOutput } from "src/shared/lib/prisma/outputs/user.output";
import { ISession } from "src/shared/types/session-metadata.type";
import { NotificationGateway } from "src/shared/websockets/notifications.gateway";
import { VerificationService } from "../verification/verification.service";
import type { AuthLoginDto } from "./dto/auth-login.dto";
import type { AuthTfaDto } from "./dto/auth-tfa.dto";

@Injectable()
export class SessionsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly redisService: RedisService,
		private readonly verificationService: VerificationService,
		private readonly notificationsService: NotificationsService,
		private readonly telegramService: TelegramService,
		private readonly notificationsSocket: NotificationGateway,
		private readonly jwtService: JwtService,
		private readonly i18n: I18nService
	) {}

	async findByUser(req: Request): Promise<ISession[]> {
		const sessions = await this.getAllUserSessions(req);

		return sessions;
	}

	async findCurrent(req: Request): Promise<ISession> {
		const sessionId = req.session.id;

		const sessionData = await this.redisService.get(`${this.configService.getOrThrow<string>("SESSION_FOLDER")}${sessionId}`);

		const session = JSON.parse(sessionData);
		const { cookie, ..._session } = session;

		return {
			..._session,
			id: sessionId,
		};
	}

	async remove(req: Request, id: string): Promise<boolean> {
		if (req.session.id === id) throw new ConflictException("Текущую сессию удалить нельзя");

		await this.redisService.del(`${this.configService.getOrThrow<string>("SESSION_FOLDER")}${id}`);

		this.notificationsSocket.handleRemoveSession({ sid: id });

		return true;
	}

	async login(dto: AuthLoginDto, req: Request, res: Response, userAgent: string): Promise<any> {
		const { id } = dto;

		const user = await this.prisma.user.findFirst({
			where: {
				OR: [{ username: { equals: id } }, { email: { equals: id } }],
			},
			select: { ...userServerOutput, settings: { select: { useTgTfaLogin: true } } },
		});

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.account.not_found"));

		const { password, ..._user } = user;
		const isValidPassword = await verify(user.password, dto.password);

		if (!isValidPassword) throw new UnauthorizedException(this.i18n.t("d.errors.invalid_password"));

		if (!user.isVerified) {
			await this.verificationService.sendVerificationEmail(req, userAgent, user);

			res.cookie(EnumStorageKeys.CURRENT_EMAIL, user.email, {
				sameSite: "lax",
				maxAge: ms("6h"),
				domain: this.configService.getOrThrow<string>("DOMAIN"),
				path: EnumClientRoutes.INDEX,
			});

			throw new UnauthorizedException(this.i18n.t("d.errors.account.not_verified"), { cause: EnumErrorCauses.ACCOUNT_NOT_VERIFIED });
		}

		if (user.isTFAEnabled) {
			if (user.settings.useTgTfaLogin && user.telegramId) {
				const metadata = getSessionMetadata(req, userAgent);

				const { room, token } = await this.telegramService.sendConfirmAuth(Number(user.telegramId), metadata, new Date().toISOString());

				const jwt_payload: { room: string; token: string } = { room: String(room), token };
				const jwt_token = this.jwtService.sign(jwt_payload, { expiresIn: "10min" });

				res.cookie(EnumStorageKeys.SOCKET_SESSION_TOKEN, jwt_token, {
					sameSite: "lax",
					maxAge: ms("10min"),
					domain: this.configService.getOrThrow<string>("DOMAIN"),
					path: EnumClientRoutes.INDEX,
				});

				return {
					tfa: true,
					tg: true,
				};
			}

			res.cookie(EnumStorageKeys.CURRENT_EMAIL, user.email, {
				sameSite: "lax",
				maxAge: ms("6h"),
				domain: this.configService.getOrThrow<string>("DOMAIN"),
				path: EnumClientRoutes.INDEX,
			});

			await this.notificationsService.send(
				user.id,
				"Кто-то только что запросил доступ к вашему аккаунту. Если это не вы просто проигнорируйте это уведомление \nБолее подробная информация указана в письме на вашей эл. почте",
				EnumNotificationType.ACCOUNT_STATUS
			);

			await this.sendTFACode(req, userAgent, user.email);

			return {
				tfa: true,
				tg: false,
			};
		}

		const metadata = getSessionMetadata(req, userAgent);

		await this.notificationsService.send(
			user.id,
			`Кто-то только что вошел на ваш аккаунт рядом с ${metadata.location.country}, ${metadata.location.city}`,
			EnumNotificationType.ACCOUNT_STATUS
		);

		await saveSession(req, _user, metadata, this.i18n);

		return true;
	}

	async cancelTgTfaLogin(req: Request, res: Response): Promise<boolean> {
		if (!req.cookies[EnumStorageKeys.SOCKET_SESSION_TOKEN]) throw new NotFoundException("JWT Токен не найден в куках");

		const payload = this.jwtService.verify<{ token: string; roomId: string }>(req.cookies[EnumStorageKeys.SOCKET_SESSION_TOKEN]);

		const existingTokens = await this.prisma.token.findMany({
			where: { type: EnumTokenTypes.TELEGRAM_TFA_AUTH },
			select: { id: true, token: true },
		});

		let tokenId = null;

		for (const token of existingTokens) {
			if (await verify(token.token, payload.token)) {
				tokenId = token.id;
				break;
			}
		}

		if (!tokenId) throw new NotFoundException("Токен не найден");

		const existingToken = await this.prisma.token.findUnique({
			where: { id: tokenId },
			select: { id: true, user: { select: { telegramId: true } } },
		});

		await this.prisma.token.delete({ where: { id: existingToken.id } });

		await this.telegramService.sendCancelAuth(existingToken.user.telegramId, payload.roomId);

		res.clearCookie(EnumStorageKeys.SOCKET_SESSION_TOKEN);

		return true;
	}

	async verifyTelegramTFAToken(dto: AuthTfaDto, req: Request, userAgent: string): Promise<boolean> {
		const user = await this.verificationService.verifyTelegramAuthToken(dto);

		const metadata = getSessionMetadata(req, userAgent);

		await this.notificationsService.send(
			user.id,
			`Кто-то только что вошел на ваш аккаунт рядом с ${metadata.location.country}, ${metadata.location.city}`,
			EnumNotificationType.ACCOUNT_STATUS
		);

		await saveSession(req, user, metadata, this.i18n);

		return true;
	}

	async verifyTFAToken(dto: AuthTfaDto, req: Request, res: Response, userAgent: string): Promise<boolean> {
		const user = await this.verificationService.verifyTFA(res, dto);

		const metadata = getSessionMetadata(req, userAgent);

		await this.notificationsService.send(
			user.id,
			`Кто-то только что вошел на ваш аккаунт рядом с ${metadata.location.country}, ${metadata.location.city}`,
			EnumNotificationType.ACCOUNT_STATUS
		);

		await saveSession(req, user, metadata, this.i18n);

		return true;
	}

	async sendTFACode(req: Request, userAgent: string, _email?: string): Promise<boolean> {
		const email = _email || (await req.cookies[EnumStorageKeys.CURRENT_EMAIL]);
		const user = await this.prisma.user.findUnique({
			where: { email },
			select: {
				...userServerOutput,
				notificationSettings: { select: { enabled: true, telegramNotificationsType: true } },
			},
		});

		if (!user || !email) throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"));

		if (!user.isTFAEnabled) throw new ConflictException(this.i18n.t("d.errors.tfa_not_enabled"));

		const token = await this.verificationService.sendTFACode(req, userAgent, user);

		if (user.telegramId && user.notificationSettings.enabled && user.notificationSettings.telegramNotificationsType) {
			await this.telegramService.sendTFAuthCode(Number(user.telegramId), token);
		}

		return true;
	}

	async logout(req: Request): Promise<boolean> {
		await destroySession(req, this.configService, this.i18n);

		return true;
	}

	async removeAllSessions(req: Request): Promise<boolean> {
		const sessions = await this.getAllUserSessions(req);
		sessions.shift();

		for (const session of sessions) {
			try {
				await this.redisService.del(`${this.configService.getOrThrow<string>("SESSION_FOLDER")}${session.id}`);
			} catch (error) {
				throw new InternalServerErrorException(`Cant delete session with id: ${session.id}`);
			}
		}

		return true;
	}

	async clearSession(req: Request): Promise<boolean> {
		req.res.clearCookie(this.configService.getOrThrow<string>("SESSION_NAME"));

		return true;
	}

	private async getAllUserSessions(req: Request): Promise<ISession[]> {
		const userId = req.session.userId;

		if (!userId) throw new NotFoundException("Пользователь не обнаружен в сессии");

		const keys = await this.redisService.keys("*");
		const userSessions = [];

		for (const key of keys) {
			const sessionData = await this.redisService.get(key);

			if (sessionData) {
				const session = JSON.parse(sessionData);

				if (session.userId === userId) {
					userSessions.push({
						...session,
						id: key.split(":")[1],
					});
				}
			}
		}

		const filteredSessions = userSessions.map(({ cookie, ...session }) => ({ ...session }));

		filteredSessions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		filteredSessions.sort((a, b) => {
			if (a.id === req.session.id) return -1;
			if (b.id === req.session.id) return 1;
			return a.id - b.id;
		});

		return filteredSessions;
	}
}
