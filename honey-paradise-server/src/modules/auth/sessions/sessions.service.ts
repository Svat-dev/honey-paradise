import type { Request, Response } from "express";
import { destroySession, saveSession } from "src/shared/lib/common/utils/session.util";
import { EnumClientRoutes, EnumErrorCauses, EnumStorageKeys } from "src/shared/types/client/enums.type";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { EnumNotificationType } from "@prisma/client";
import { verify } from "argon2";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { RedisService } from "src/core/redis/redis.service";
import { NotificationsService } from "src/modules/notifications/notifications.service";
import { ms } from "src/shared/lib/common/utils";
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util";
import { userServerOutput } from "src/shared/lib/prisma/outputs/user.output";
import { NotificationGateway } from "src/shared/websockets/notifications.gateway";
import { VerificationService } from "../verification/verification.service";
import type { AuthLoginDto } from "./dto/auth-login.dto";

@Injectable()
export class SessionsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly redisService: RedisService,
		private readonly verificationService: VerificationService,
		private readonly notificationsService: NotificationsService,
		private readonly socket: NotificationGateway,
		private readonly i18n: I18nService
	) {}

	async findByUser(req: Request) {
		const sessions = await this.getAllUserSessions(req);

		return sessions;
	}

	async findCurrent(req: Request) {
		const sessionId = req.session.id;

		const sessionData = await this.redisService.get(`${this.configService.getOrThrow<string>("SESSION_FOLDER")}${sessionId}`);

		const session = JSON.parse(sessionData);
		const { cookie, ..._session } = session;

		return {
			..._session,
			id: sessionId,
		};
	}

	async remove(req: Request, id: string) {
		if (req.session.id === id) throw new ConflictException("Текущую сессию удалить нельзя");

		await this.redisService.del(`${this.configService.getOrThrow<string>("SESSION_FOLDER")}${id}`);

		this.socket.handleRemoveSession({ sid: id });

		return true;
	}

	async login(dto: AuthLoginDto, req: Request, res: Response, userAgent: string) {
		const { id } = dto;

		const user = await this.prisma.user.findFirst({
			where: {
				OR: [{ username: { equals: id } }, { email: { equals: id } }],
			},
			select: userServerOutput,
		});

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.account.not_found"));

		const { password, ..._user } = user;
		const isValidPassword = await verify(user.password, dto.password);

		if (!isValidPassword) throw new UnauthorizedException(this.i18n.t("d.errors.invalid_password"));

		if (!user.isVerified) {
			await this.verificationService.sendVerificationEmail(req, userAgent);

			res.cookie(EnumStorageKeys.CURRENT_EMAIL, user.email, {
				sameSite: "lax",
				maxAge: ms("6h"),
				domain: this.configService.getOrThrow<string>("DOMAIN"),
				path: EnumClientRoutes.INDEX,
			});

			throw new UnauthorizedException(this.i18n.t("d.errors.account.not_verified"), { cause: EnumErrorCauses.ACCOUNT_NOT_VERIFIED });
		}

		if (user.isTFAEnabled) {
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
			await this.verificationService.sendTFAEmail(req, userAgent, user.email);

			return {
				tfa: true,
			};
		}

		const metadata = getSessionMetadata(req, userAgent);

		await this.notificationsService.send(
			user.id,
			`Кто-то только что вошел на ваш аккаунт рядом с ${metadata.location.country}, ${metadata.location.city}`,
			EnumNotificationType.ACCOUNT_STATUS
		);

		return saveSession(req, _user, metadata, this.i18n);
	}

	async sendTFACode(req: Request, userAgent: string) {
		const email = await req.cookies[EnumStorageKeys.CURRENT_EMAIL];
		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user || !email) throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"));

		if (!user.isTFAEnabled) throw new ConflictException(this.i18n.t("d.errors.tfa_not_enabled"));

		await this.verificationService.sendTFAEmail(req, userAgent, email);

		return true;
	}

	async logout(req: Request) {
		return destroySession(req, this.configService, this.i18n);
	}

	async removeAllSessions(req: Request) {
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

	async clearSession(req: Request) {
		req.res.clearCookie(this.configService.getOrThrow<string>("SESSION_NAME"));

		return true;
	}

	private async getAllUserSessions(req: Request) {
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
