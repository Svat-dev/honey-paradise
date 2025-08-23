import type { Request, Response } from "express";
import { EnumClientRoutes, EnumStorageKeys } from "src/shared/types/client/enums.type";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { EnumNotificationType, EnumProviderTypes, type Provider, type User } from "@prisma/client";
import { hash } from "argon2";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { NotificationsService } from "src/modules/notifications/notifications.service";
import { DEFAULT_AVATAR_PATH } from "src/shared/lib/common/constants";
import { ms } from "src/shared/lib/common/utils";
import { getEmailUsername } from "src/shared/lib/common/utils/get-email-username.util";
import { userFullOutput } from "src/shared/lib/prisma/outputs/user.output";
import { v4 as uuidv4 } from "uuid";
import { ProfileService } from "../profile/profile.service";
import { SessionsService } from "../sessions/sessions.service";
import { VerificationService } from "../verification/verification.service";
import type { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AccountService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly profileService: ProfileService,
		private readonly verificationService: VerificationService,
		private readonly sessionsService: SessionsService,
		private readonly configService: ConfigService,
		private readonly notificationsService: NotificationsService,
		private readonly i18n: I18nService
	) {}

	async me(id: string) {
		const user = await this.prisma.user.findUnique({ where: { id }, select: userFullOutput });

		return user;
	}

	async create(dto: CreateUserDto, req: Request, res: Response, userAgent: string) {
		const { email } = dto;

		const isEmailExist = await this.profileService.getProfile(email, "email");
		if (isEmailExist) throw new BadRequestException(this.i18n.t("d.errors.email.is_exist"));

		await this.createNew({ ...dto, avatarPath: DEFAULT_AVATAR_PATH }, true);

		res.cookie(EnumStorageKeys.CURRENT_EMAIL, email, {
			sameSite: "lax",
			maxAge: ms("6h"),
			domain: this.configService.getOrThrow<string>("DOMAIN"),
			path: EnumClientRoutes.INDEX,
		});

		return this.verificationService.sendVerificationEmail(req, userAgent);
	}

	async createNew(dto: Partial<User & Provider>, isRegister: boolean = false) {
		const { email, password, birthdate, gender, username, avatarPath, providerId, type, isVerified } = dto;

		const isUsernameExist = username ? await this.profileService.getProfile(username, "username") : false;
		if (isUsernameExist && isRegister) throw new BadRequestException(this.i18n.t("d.errors.username.is_exist"));

		const new_username = typeof username === "undefined" ? await this.getUsernameFromEmail(email) : username;

		const user = await this.prisma.user.create({
			data: {
				email,
				password: await hash(password),
				username: new_username,
				birthdate,
				gender,
				avatarPath,
				isVerified,
				settings: { create: {} },
				notificationSettings: { create: {} },
				cart: { create: {} },
			},
			select: { id: true },
		});

		await this.prisma.provider.create({
			data: {
				userId: user.id,
				providerId: providerId || uuidv4(),
				type: type ? (type.toUpperCase() as EnumProviderTypes) : EnumProviderTypes.CREDENTIALS,
			},
		});

		return user;
	}

	async changeEmail(id: string, email: string) {
		const user = await this.profileService.getProfile(email, "email");

		if (user) throw new BadRequestException(this.i18n.t("d.errors.email.is_exist"));

		await this.prisma.user.update({
			where: { id },
			data: {
				email,
				isVerified: false,
			},
		});

		return true;
	}

	async updatePassword(id: string, password: string, req: Request) {
		const { isTFAEnabled } = await this.profileService.updatePassword(id, password);

		await this.notificationsService.send(id, "Ваш пароль был только что изменен на ...", EnumNotificationType.ACCOUNT_STATUS);

		if (isTFAEnabled) {
			await this.sessionsService.logout(req);

			return { res: "redirect/logout" };
		} else return true;
	}

	private async getUsernameFromEmail(email: string) {
		let res: any;

		const emailUsername = getEmailUsername(email);

		const isUsernameExist = await this.profileService.getProfile(emailUsername, "username");

		if (isUsernameExist) {
			const getAllUsernames = await this.prisma.user.findMany({
				where: {
					username: { contains: `${emailUsername}_` },
				},
			});

			if (getAllUsernames.length) {
				const usernames = getAllUsernames.map(user => user.username).sort((a, b) => Number(b.split("_")[1]) - Number(a.split("_")[1]));

				const lastUsername = Number(usernames[0].split("_")[1]);
				res = `${emailUsername}_${lastUsername + 1}`;
			} else res = `${emailUsername}_1`;
		} else res = emailUsername;

		return res;
	}
}
