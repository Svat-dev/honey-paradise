import type { Request, Response } from "express";
import { destroySession, saveSession } from "src/shared/lib/common/utils/session.util";
import { EnumClientRoutes, EnumErrorCauses, EnumStorageTokens } from "src/shared/types/client/enums.type";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { verify } from "argon2";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { RedisService } from "src/core/redis/redis.service";
import { ms } from "src/shared/lib/common/utils";
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util";
import { userServerOutput } from "src/shared/lib/prisma/outputs/user.output";
import { VerificationService } from "../verification/verification.service";
import type { AuthLoginDto } from "./dto/auth-login.dto";

@Injectable()
export class SessionsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly redisService: RedisService,
		private readonly i18n: I18nService,
		private readonly verificationService: VerificationService
	) {}

	async findByUser(req: Request) {
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
			await this.verificationService.sendVerificationEmail(user.email);

			res.cookie(EnumStorageTokens.CURRENT_EMAIL, user.email, {
				sameSite: "lax",
				maxAge: ms("6h"),
				domain: this.configService.getOrThrow<string>("DOMAIN"),
				path: EnumClientRoutes.AUTH,
			});

			throw new UnauthorizedException(this.i18n.t("d.errors.account.not_verified"), { cause: EnumErrorCauses.ACCOUNT_NOT_VERIFIED });
		}

		const metadata = getSessionMetadata(req, userAgent);
		return saveSession(req, _user, metadata, this.i18n);
	}

	async logout(req: Request) {
		return destroySession(req, this.configService, this.i18n);
	}

	async clearSession(req: Request) {
		req.res.clearCookie(this.configService.getOrThrow<string>("SESSION_NAME"));

		return true;
	}
}
