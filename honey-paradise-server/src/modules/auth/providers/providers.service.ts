import type { EnumProviderTypes, Provider } from "@prisma/client";
import type { Request, Response } from "express";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util";
import { saveSession } from "src/shared/lib/common/utils/session.util";
import { providerDefaultOutput } from "src/shared/lib/prisma/outputs/providers.outpur";
import { EnumClientRoutes } from "src/shared/types/client/enums.type";
import type { IProviderUser } from "src/shared/types/providers.type";
import { v4 as uuidv4 } from "uuid";
import { AccountService } from "../account/account.service";
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class ProvidersService {
	constructor(
		private readonly profileService: ProfileService,
		private readonly accountService: AccountService,
		private readonly prisma: PrismaService,
		private readonly config: ConfigService,
		private readonly i18n: I18nService
	) {}

	async oAuth_first(req: Request, res: Response, userAgent: string) {
		if (!req.user) throw new UnauthorizedException(this.i18n.t("d.errors.not_auth"));

		const { email, provider, providerId, avatar, username } = req.user as IProviderUser;

		const existingProvider = await this.getProviderById(providerId);

		if (req.session.userId) {
			return this.connectUserToProvider(req.session.userId, existingProvider, req.user as IProviderUser, res);
		}

		const existingUser = await this.profileService.getProfile(email, "email");

		if (existingProvider) {
			const user = await this.profileService.getProfile(existingProvider.userId, "id");
			if (!user) throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"));

			const metadata = getSessionMetadata(req, userAgent);
			await saveSession(req, user, metadata, this.i18n);
		} else {
			if (existingUser) throw new UnauthorizedException(this.i18n.t("d.errors.not_auth"));

			const user = await this.accountService.createNew({
				avatarPath: avatar,
				email,
				username,
				isVerified: true,
				providerId,
				type: provider as EnumProviderTypes,
				password: uuidv4(),
			});

			const metadata = getSessionMetadata(req, userAgent);
			await saveSession(req, user, metadata, this.i18n);
		}

		return res.redirect(this.config.getOrThrow<string>("CLIENT_URL") + EnumClientRoutes.CONNECTIONS + "?oauth=true");
	}

	async getProvidersByUser(userId: string) {
		const providers = await this.prisma.provider.findMany({
			where: { userId, type: { not: "CREDENTIALS" } },
			select: providerDefaultOutput,
		});

		return providers;
	}

	async deleteUserProvider(userId: string, id: string) {
		const provider = await this.prisma.provider.findUnique({ where: { id, userId } });
		if (!provider) throw new NotFoundException(this.i18n.t("d.errors.provider.not_found"));

		await this.prisma.provider.delete({ where: { id: provider.id } });

		return true;
	}

	private async connectUserToProvider(userId: string, existingProvider: Provider, data: IProviderUser, res: Response) {
		const { provider, providerId } = data;

		const user = await this.profileService.getProfile(userId, "id");
		if (!user) throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"));

		if (existingProvider) {
			if (existingProvider.userId === user.id) throw new ConflictException("d.errors.provider.already_connected_by_you");
			else throw new ConflictException("d.errors.provider.already_connected");
		}

		await this.prisma.provider.create({
			data: {
				userId: user.id,
				providerId,
				type: provider.toUpperCase() as EnumProviderTypes,
			},
		});

		return res.redirect(this.config.getOrThrow<string>("CLIENT_URL") + EnumClientRoutes.CONNECTIONS + "?connect=true");
	}

	private async getProviderById(id: string) {
		const provider = await this.prisma.provider.findUnique({ where: { providerId: id }, select: providerDefaultOutput });

		return provider;
	}
}
