import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { ConfigService } from "@nestjs/config/dist/config.service"
import {
	EnumNotificationType,
	type EnumProviderTypes,
	type Provider
} from "@prisma/client"
import { randomBytes } from "crypto"
import type { Request, Response } from "express"
import { I18nService } from "nestjs-i18n/dist/services/i18n.service"
import { PrismaService } from "src/core/prisma/prisma.service"
import { NotificationsService } from "src/modules/notifications/notifications.service"
import { capitalize } from "src/shared/lib/common/utils/capitalize.util"
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util"
import { saveSession } from "src/shared/lib/common/utils/session.util"
import { providerDefaultOutput } from "src/shared/lib/prisma/outputs/providers.output"
import { EnumClientRoutes } from "src/shared/types/client/enums.type"
import type { IException } from "src/shared/types/exception.type"
import type { IProviderUser } from "src/shared/types/providers.type"

import { AccountService } from "../account/account.service"
import { ProfileService } from "../profile/profile.service"

@Injectable()
export class ProvidersService {
	constructor(
		private readonly profileService: ProfileService,
		private readonly accountService: AccountService,
		private readonly notificationsService: NotificationsService,
		private readonly prisma: PrismaService,
		private readonly config: ConfigService,
		private readonly i18n: I18nService
	) {}

	async oAuth_first(req: Request, res: Response, userAgent: string) {
		if (!req.user)
			return this.throwError(
				res,
				this.i18n.t("d.errors.not_auth"),
				HttpStatus.UNAUTHORIZED,
				"oauth"
			)

		const { email, provider, providerId, avatar, username } =
			req.user as IProviderUser

		const existingProvider = await this.getProviderById(providerId)

		if (req.session.userId && req.session.id) {
			const userId = req.session.userId
			const sid = req.session.id

			return this.connectUserToProvider(
				userId,
				existingProvider,
				req.user as IProviderUser,
				res
			)
		}

		const existingUser = await this.profileService.getProfile(email, "email")

		if (existingProvider) {
			const user = await this.profileService.getProfile(
				existingProvider.userId,
				"id"
			)
			if (!user)
				return this.throwError(
					res,
					this.i18n.t("d.errors.profile.not_found"),
					HttpStatus.NOT_FOUND,
					"oauth"
				)

			await this.notificationsService.send(
				user.id,
				`На ваш аккаунт только что был совершен вход через ${existingProvider.type.toLocaleUpperCase("ru")}`,
				EnumNotificationType.ACCOUNT_STATUS
			)

			const metadata = getSessionMetadata(req, userAgent, existingProvider.type)
			await saveSession(req, user, metadata, this.i18n)
		} else {
			if (existingUser)
				return this.throwError(
					res,
					this.i18n.t("d.errors.not_auth"),
					HttpStatus.UNAUTHORIZED,
					"oauth"
				)

			const user = await this.accountService.createNew({
				avatarPath: avatar,
				email,
				username,
				isVerified: true,
				providerId,
				type: provider as EnumProviderTypes,
				password: randomBytes(20).toString("hex")
			})

			const metadata = getSessionMetadata(
				req,
				userAgent,
				provider.toLowerCase() as EnumProviderTypes
			)
			await saveSession(req, user, metadata, this.i18n)
		}

		return res.redirect(
			this.config.getOrThrow<string>("CLIENT_URL") +
				EnumClientRoutes.CONNECTIONS +
				"?oauth=true"
		)
	}

	async getProvidersByUser(userId: string) {
		const providers = await this.prisma.provider.findMany({
			where: { userId, type: { not: "CREDENTIALS" } },
			select: providerDefaultOutput
		})

		return providers
	}

	async deleteUserProvider(userId: string, id: string): Promise<boolean> {
		const provider = await this.prisma.provider.findUnique({
			where: { id, userId }
		})
		if (!provider)
			throw new NotFoundException(this.i18n.t("d.errors.provider.not_found"))

		await this.prisma.provider.delete({ where: { id: provider.id } })

		await this.notificationsService.send(
			userId,
			`Учетная запись ${provider.type} только что была отсоединена от вашего аккаунта`,
			EnumNotificationType.ACCOUNT_STATUS
		)

		return true
	}

	private async connectUserToProvider(
		userId: string,
		existingProvider: Provider,
		data: IProviderUser,
		res: Response
	) {
		const { provider, providerId } = data

		const user = await this.profileService.getProfile(userId, "id")
		if (!user)
			return this.throwError(
				res,
				this.i18n.t("d.errors.profile.not_found"),
				HttpStatus.NOT_FOUND,
				"connect"
			)

		if (existingProvider) {
			if (existingProvider.userId === user.id)
				return this.throwError(
					res,
					this.i18n.t("d.errors.provider.already_connected_by_you", {
						args: { provider: capitalize(existingProvider.type.toLowerCase()) }
					}),
					HttpStatus.CONFLICT,
					"connect"
				)
			else
				return this.throwError(
					res,
					this.i18n.t("d.errors.provider.already_connected", {
						args: { provider: capitalize(existingProvider.type.toLowerCase()) }
					}),
					HttpStatus.CONFLICT,
					"connect"
				)
		}

		await this.prisma.provider.create({
			data: {
				userId: user.id,
				providerId,
				type: provider.toUpperCase() as EnumProviderTypes
			}
		})

		await this.notificationsService.send(
			user.id,
			`Учетная запись ${provider} только что была соединена с вашим аккаунтом`,
			EnumNotificationType.ACCOUNT_STATUS
		)

		return res.redirect(
			this.config.getOrThrow<string>("CLIENT_URL") +
				EnumClientRoutes.CONNECTIONS +
				"?connect=true"
		)
	}

	private async getProviderById(id: string): Promise<Provider> {
		const provider = await this.prisma.provider.findUnique({
			where: { providerId: id },
			select: providerDefaultOutput
		})

		return provider
	}

	private async throwError(
		res: Response,
		msg: string,
		status: HttpStatus,
		type: "connect" | "oauth"
	) {
		const exception: IException = {
			message: msg,
			status,
			timestamp: new Date().toISOString()
		}

		const searchParams = new URLSearchParams()

		for (const key in exception) {
			searchParams.set(key, exception[key].toString())
		}

		searchParams.set("error", "true")

		const url =
			this.config.getOrThrow<string>("CLIENT_URL") +
			(type === "connect"
				? EnumClientRoutes.CONNECTIONS
				: EnumClientRoutes.SIGN_IN)

		return res.redirect(url + `?${searchParams.toString()}`)
	}
}
