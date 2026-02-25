import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception"
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { EnumNotificationType } from "@prisma/client"
import { verify } from "argon2"
import { isUUID } from "class-validator"
import type { Request, Response } from "express"
import { I18nService } from "nestjs-i18n/dist/services/i18n.service"
import { PrismaService } from "src/core/prisma/prisma.service"
import { RedisService } from "src/core/redis/redis.service"
import { TelegramService } from "src/core/telegram/telegram.service"
import { NotificationsService } from "src/modules/notifications/notifications.service"
import { ms, success } from "src/shared/lib/common/utils"
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util"
import {
	destroySession,
	saveSession
} from "src/shared/lib/common/utils/session.util"
import { userServerOutput } from "src/shared/lib/prisma/outputs/user.output"
import { DefaultResponse } from "src/shared/lib/response/default.res"
import {
	EnumClientRoutes,
	EnumErrorCauses,
	EnumStorageKeys
} from "src/shared/types/client/enums.type"
import { ISession } from "src/shared/types/session-metadata.type"
import { NotificationGateway } from "src/shared/websockets/notifications.gateway"

import { VerificationService } from "../verification/verification.service"

import type { AuthLoginDto } from "./dto/auth-login.dto"
import type { AuthTfaDto } from "./dto/auth-tfa.dto"

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
		private readonly i18n: I18nService
	) {}

	async findByUser(req: Request): Promise<ISession[]> {
		const sessions = await this.getAllUserSessions(
			req.session.userId,
			req.session.id
		)

		return sessions
	}

	async findCurrent(req: Request): Promise<ISession> {
		const sessionId = req.session.id

		const session = await this.redisService.getSession(sessionId)

		return session
	}

	async remove(req: Request, id: string): Promise<DefaultResponse> {
		if (req.session.id === id)
			throw new ConflictException("Текущую сессию удалить нельзя")

		await this.redisService.deleteSession(id)

		this.notificationsSocket.handleRemoveSession({ sid: id })

		return success()
	}

	async login(
		dto: AuthLoginDto,
		req: Request,
		res: Response,
		userAgent: string
	): Promise<any> {
		const { id } = dto

		const user = await this.prisma.user.findFirst({
			where: {
				OR: [{ username: { equals: id } }, { email: { equals: id } }]
			},
			select: {
				...userServerOutput,
				settings: { select: { useTgTfaLogin: true } }
			}
		})

		if (!user)
			throw new NotFoundException(this.i18n.t("d.errors.account.not_found"))

		const { password, ..._user } = user
		const isValidPassword = await verify(user.password, dto.password)

		if (!isValidPassword)
			throw new UnauthorizedException(this.i18n.t("d.errors.invalid_password"))

		if (!user.isVerified) {
			await this.verificationService.sendVerificationEmail(req, userAgent, user)

			res.cookie(EnumStorageKeys.CURRENT_EMAIL, user.email, {
				sameSite: "lax",
				maxAge: ms("6h"),
				domain: this.configService.getOrThrow<string>("DOMAIN"),
				path: EnumClientRoutes.INDEX
			})

			throw new UnauthorizedException(
				this.i18n.t("d.errors.account.not_verified"),
				{ cause: EnumErrorCauses.ACCOUNT_NOT_VERIFIED }
			)
		}

		if (user.isTFAEnabled) {
			if (user.settings.useTgTfaLogin && user.telegramId) {
				const metadata = getSessionMetadata(req, userAgent)

				const [success, response] = await this.telegramService.sendConfirmAuth(
					Number(user.telegramId),
					metadata
				)

				if (!success) throw new ForbiddenException(response)

				res.cookie(EnumStorageKeys.SOCKET_SESSION_TOKEN, response, {
					sameSite: "lax",
					maxAge: ms("10min"),
					domain: this.configService.getOrThrow<string>("DOMAIN"),
					path: EnumClientRoutes.INDEX
				})

				return {
					tfa: true,
					tg: true
				}
			}

			res.cookie(EnumStorageKeys.CURRENT_EMAIL, user.email, {
				sameSite: "lax",
				maxAge: ms("6h"),
				domain: this.configService.getOrThrow<string>("DOMAIN"),
				path: EnumClientRoutes.INDEX
			})

			await this.notificationsService.send(
				user.id,
				"Кто-то только что запросил доступ к вашему аккаунту. Если это не вы просто проигнорируйте это уведомление \nБолее подробная информация указана в письме на вашей эл. почте",
				EnumNotificationType.ACCOUNT_STATUS
			)

			await this.sendTFACode(req, userAgent, user.email)

			return {
				tfa: true,
				tg: false
			}
		}

		const metadata = getSessionMetadata(req, userAgent)

		await this.notificationsService.send(
			user.id,
			`Кто-то только что вошел на ваш аккаунт рядом с ${metadata.location.country}, ${metadata.location.city}`,
			EnumNotificationType.ACCOUNT_STATUS
		)

		return saveSession(req, _user, metadata, this.i18n)
	}

	async cancelTgTfaLogin(
		req: Request,
		res: Response
	): Promise<DefaultResponse> {
		if (!req.cookies[EnumStorageKeys.SOCKET_SESSION_TOKEN])
			throw new NotFoundException("Токен комнаты не найден в куках")

		const roomId = req.cookies[EnumStorageKeys.SOCKET_SESSION_TOKEN]

		await this.telegramService.sendCancelAuth(roomId)

		res.clearCookie(EnumStorageKeys.SOCKET_SESSION_TOKEN)

		return success()
	}

	async verifyTelegramTFAToken(
		dto: AuthTfaDto,
		req: Request,
		userAgent: string
	): Promise<DefaultResponse> {
		const room = req.cookies[EnumStorageKeys.SOCKET_SESSION_TOKEN]

		if (!isUUID(room, 6)) throw new BadRequestException("Invalid room ID")

		const user = await this.verificationService.verifyTelegramAuthToken(dto)

		const metadata = getSessionMetadata(req, userAgent)

		await this.notificationsService.send(
			user.id,
			`Кто-то только что вошел на ваш аккаунт рядом с ${metadata.location.country}, ${metadata.location.city}`,
			EnumNotificationType.ACCOUNT_STATUS
		)

		await saveSession(req, user, metadata, this.i18n)

		return success()
	}

	async verifyTFAToken(
		dto: AuthTfaDto,
		req: Request,
		res: Response,
		userAgent: string
	): Promise<DefaultResponse> {
		const user = await this.verificationService.verifyTFA(res, dto)

		const metadata = getSessionMetadata(req, userAgent)

		await this.notificationsService.send(
			user.id,
			`Кто-то только что вошел на ваш аккаунт рядом с ${metadata.location.country}, ${metadata.location.city}`,
			EnumNotificationType.ACCOUNT_STATUS
		)

		await saveSession(req, user, metadata, this.i18n)

		return success()
	}

	async sendTFACode(
		req: Request,
		userAgent: string,
		_email?: string
	): Promise<DefaultResponse> {
		const email = _email || (await req.cookies[EnumStorageKeys.CURRENT_EMAIL])
		const user = await this.prisma.user.findUnique({
			where: { email },
			select: {
				...userServerOutput,
				notificationSettings: {
					select: { enabled: true, telegramNotificationsType: true }
				}
			}
		})

		if (!user || !email)
			throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"))

		if (!user.isTFAEnabled)
			throw new ConflictException(this.i18n.t("d.errors.tfa_not_enabled"))

		const token = await this.verificationService.sendTFACode(
			req,
			userAgent,
			user
		)

		if (
			user.telegramId &&
			user.notificationSettings.enabled &&
			user.notificationSettings.telegramNotificationsType
		) {
			await this.telegramService.sendTFAuthCode(Number(user.telegramId), token)
		}

		return success()
	}

	async logout(req: Request): Promise<DefaultResponse> {
		await destroySession(req, this.configService, this.i18n)

		return success()
	}

	async removeAllSessions(req: Request): Promise<DefaultResponse> {
		const sessions = await this.getAllUserSessions(
			req.session.userId,
			req.session.id
		)
		const sessionIds = sessions.map((item, i) => {
			if (i !== 0) return item.id
		})

		await this.redisService.deleteSession(sessionIds)

		return success()
	}

	async clearSession(req: Request): Promise<DefaultResponse> {
		req.res.clearCookie(this.configService.getOrThrow<string>("SESSION_NAME"))

		return success()
	}

	private async getAllUserSessions(
		uid: string,
		sid: string
	): Promise<ISession[]> {
		if (!uid) throw new NotFoundException("Пользователь не обнаружен в сессии")

		const data = await this.redisService.getDataByFolder<ISession>(
			this.redisService.sessionFolder
		)

		data.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)

		return data
	}
}
