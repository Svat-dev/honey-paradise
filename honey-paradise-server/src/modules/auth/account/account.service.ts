import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { hash } from "argon2";
import type { Response } from "express";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ms } from "src/shared/lib/common/utils";
import { getEmailUsername } from "src/shared/lib/common/utils/get-email-username.util";
import { userFullOutput } from "src/shared/lib/prisma/outputs/user.output";
import { ProfileService } from "../profile/profile.service";
import { VerificationService } from "../verification/verification.service";
import type { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AccountService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly profileService: ProfileService,
		private readonly verificationService: VerificationService,
		private readonly i18n: I18nService
	) {}

	async me(id: string) {
		const user = await this.prisma.user.findUnique({ where: { id }, select: userFullOutput });

		return user;
	}

	async create(dto: CreateUserDto, res: Response) {
		const { email, password, birthdate, gender, username } = dto;

		const isEmailExist = await this.profileService.getProfile(email, "email");
		if (isEmailExist) throw new BadRequestException(this.i18n.t("d.errors.email_is_exist"));

		const isUsernameExist = username ? await this.profileService.getProfile(username, "username") : false;
		if (isUsernameExist) throw new BadRequestException(this.i18n.t("d.errors.username_is_exist"));

		await this.prisma.user.create({
			data: {
				email,
				password: await hash(password),
				username: username || getEmailUsername(email),
				birthdate,
				gender,
				settings: { create: {} },
				notificationSettings: { create: {} },
				cart: { create: {} },
			},
		});

		res.cookie("HONEY_PARADISE_CURRENT_EMAIL", email, {
			sameSite: "lax",
			maxAge: ms("6h"),
			domain: "localhost",
			path: "/auth/confirmation",
		});

		return this.verificationService.sendVerificationEmail(email);
	}
}
