import type { Request, Response } from "express";
import { EnumClientRoutes, EnumStorageKeys } from "src/shared/types/client/enums.type";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { EnumNotificationType, EnumProviderTypes, type Provider, type User } from "@prisma/client";
import { hash } from "argon2";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { TelegramService } from "src/core/telegram/telegram.service";
import { NotificationsService } from "src/modules/notifications/notifications.service";
import { DEFAULT_AVATAR_PATH } from "src/shared/lib/common/constants";
import { ms } from "src/shared/lib/common/utils";
import { getEmailUsername } from "src/shared/lib/common/utils/get-email-username.util";
import { userFullOutput, userServerOutput } from "src/shared/lib/prisma/outputs/user.output";
import { v4 as uuidv4 } from "uuid";
import { ProfileService } from "../profile/profile.service";
import { SessionsService } from "../sessions/sessions.service";
import { VerificationService } from "../verification/verification.service";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdatePasswordDto } from "./dto/password-recover.dto";
import type { IGetTelegramInfoResponse } from "./type";

@Injectable()
export class AccountService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly profileService: ProfileService,
		private readonly verificationService: VerificationService,
		private readonly sessionsService: SessionsService,
		private readonly configService: ConfigService,
		private readonly notificationsService: NotificationsService,
		private readonly telegramService: TelegramService,
		private readonly i18n: I18nService
	) {}

	async me(id: string) {
		const user = await this.prisma.user.findUnique({ where: { id }, select: userFullOutput });

		return user;
	}

	async getTelegramInfo(userId: string): Promise<IGetTelegramInfoResponse> {
		const user = await this.profileService.getProfile(userId, "id");

		if (!user.telegramId) throw new BadRequestException(this.i18n.t("d.errors.account.telegram_not_connected"));

		const { username } = await this.telegramService.getTgUsername(+user.telegramId);

		return {
			connected: true,
			tgUsername: username,
			tgId: user.telegramId,
		};
	}

	async disconnectTelegram(userId: string): Promise<boolean> {
		const user = await this.profileService.getProfile(userId, "id");

		if (!user.telegramId) throw new ConflictException(this.i18n.t("d.errors.account.telegram_not_connected"));

		await this.profileService.updateProfile(user.id, { telegramId: null });

		await this.notificationsService.updateSettings(userId, { siteNotificationsType: true, telegramNotificationsType: false });

		await this.notificationsService.send(userId, "Telegram аккаунт был только что отвязан", EnumNotificationType.ACCOUNT_STATUS);

		return true;
	}

	async create(dto: CreateUserDto, req: Request, res: Response, userAgent: string): Promise<boolean> {
		const { email } = dto;

		const isEmailExist = await this.profileService.getProfile(email, "email");
		if (isEmailExist) throw new BadRequestException(this.i18n.t("d.errors.email.is_exist"));

		const user = await this.createNew({ ...dto, avatarPath: DEFAULT_AVATAR_PATH }, true);

		res.cookie(EnumStorageKeys.CURRENT_EMAIL, email, {
			sameSite: "lax",
			maxAge: ms("6h"),
			domain: this.configService.getOrThrow<string>("DOMAIN"),
			path: EnumClientRoutes.INDEX,
		});

		await this.verificationService.sendVerificationEmail(req, userAgent, user);

		return true;
	}

	async createNew(dto: Partial<User & Provider>, isRegister: boolean = false): Promise<User> {
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
			select: { ...userServerOutput },
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

	async sendEmailVerificationCode(req: Request, userAgent: string, _email?: string): Promise<boolean> {
		const email = _email || (await req.cookies[EnumStorageKeys.CURRENT_EMAIL]);
		const user = await this.prisma.user.findUnique({
			where: { email },
			select: {
				...userServerOutput,
				notificationSettings: { select: { enabled: true, telegramNotificationsType: true } },
			},
		});

		if (!user || !email) throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"));

		const token = await this.verificationService.sendVerificationEmail(req, userAgent, user);

		if (user.telegramId && user.notificationSettings.enabled && user.notificationSettings.telegramNotificationsType) {
			await this.telegramService.sendEmailConfirmationCode(Number(user.telegramId), token);
		}

		return true;
	}

	async changeEmail(id: string, email: string): Promise<boolean> {
		const existingUser = await this.profileService.getProfile(email, "email");

		if (existingUser) throw new BadRequestException(this.i18n.t("d.errors.email.is_exist"));

		const user = await this.prisma.user.update({
			where: { id },
			data: {
				email,
				isVerified: false,
			},
			select: { id: true, email: true },
		});

		const msg = `Ваша эл. почта была только что изменена на ${user.email}, теперь ее необходимо подтвердить`;

		await this.notificationsService.send(user.id, msg, EnumNotificationType.ACCOUNT_STATUS);

		return true;
	}

	async updatePassword(id: string, password: string, req: Request) {
		const { isTFAEnabled } = await this.profileService.updatePassword(id, password);

		await this.notificationsService.send(id, "На вашем аккаунте был только что изменен пароль", EnumNotificationType.ACCOUNT_STATUS);

		if (isTFAEnabled) {
			await this.sessionsService.logout(req);

			return { res: "redirect/logout" };
		} else return true;
	}

	async recoverPassword(dto: UpdatePasswordDto): Promise<boolean> {
		const { id } = await this.verificationService.recoverPassword(dto);

		await this.notificationsService.send(id, "На вашем аккаунте был только что изменен пароль", EnumNotificationType.ACCOUNT_STATUS);

		return true;
	}

	private async getUsernameFromEmail(email: string): Promise<string> {
		let res: string;

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
