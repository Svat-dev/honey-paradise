import * as fs from "fs";
import * as path from "path";
import * as sharp from "sharp";

import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { DEFAULT_AVATAR_PATH } from "src/shared/lib/common/constants";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "src/core/prisma/prisma.service";
import type { UpdateUserSettingsDto } from "./dto/update-user-settings.dto";
import { hash } from "argon2";

@Injectable()
export class ProfileService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly i18n: I18nService
	) {}

	async deleteAvatar(userId: string, exact: boolean = false) {
		const user = await this.getProfile(userId, "id");
		const avatarPath = user.avatarPath;

		if (!avatarPath && !exact) throw new BadRequestException(this.i18n.t("d.errors.profile.avatar_not_found"));

		if (avatarPath === DEFAULT_AVATAR_PATH) {
			if (!exact) throw new BadRequestException(this.i18n.t("d.errors.profile.avatar_not_found"));
			else return false;
		}

		const filepath = path.join(__dirname, "../../../..", "public", avatarPath);

		if (fs.existsSync(filepath)) {
			fs.unlinkSync(filepath);

			if (exact) return true;

			await this.prisma.user.update({
				where: { id: userId },
				data: { avatarPath: DEFAULT_AVATAR_PATH },
			});

			return true;
		} else {
			if (!exact) throw new BadRequestException(this.i18n.t("d.errors.profile.avatar_not_found"));
			return false;
		}
	}

	async updateAvatar(userId: string, file: Express.Multer.File) {
		const uploadDir = path.join(__dirname, "../../../..", "public", "avatars", "uploads");

		let randomNumber: string = "";

		for (let i = 0; i < 8; i++) {
			randomNumber += Math.floor(Math.random() * 10)
				.toString()
				.padStart(2, "0");
		}

		const filename = `${randomNumber}-${userId}.webp`;
		const filePath = path.join(uploadDir, filename);

		await this.deleteAvatar(userId, true);

		if (file.originalname.endsWith(".gif")) {
			const processedBuffer = await sharp(file.buffer, { animated: true }).resize(512, 512).webp().toBuffer();

			fs.writeFileSync(filePath, processedBuffer);
		} else {
			const processedBuffer = await sharp(file.buffer).resize(512, 512).webp().toBuffer();

			fs.writeFileSync(filePath, processedBuffer);
		}

		await this.prisma.user.update({ where: { id: userId }, data: { avatarPath: `/avatars/uploads/${filename}` } });

		return true;
	}

	async getProfile(id: string, type: "email" | "username" | "id" | "phone") {
		if (type === "id") {
			const profile = await this.prisma.user.findUnique({ where: { id } });

			return profile;
		} else if (type === "email") {
			const profile = await this.prisma.user.findUnique({ where: { email: id } });

			return profile;
		} else if (type === "username") {
			const profile = await this.prisma.user.findUnique({ where: { username: id } });

			return profile;
		} else {
			const profile = await this.prisma.user.findUnique({ where: { phoneNumber: id } });

			return profile;
		}
	}

	async checkUnique(id: string, type: "email" | "username" | "phone") {
		const existingUser = await this.prisma.user.findFirst({
			where: {
				OR: [
					{ email: type === "email" ? id : undefined },
					{ username: type === "username" ? id : undefined },
					{ phoneNumber: type === "phone" ? id : undefined },
				],
			},
		});

		if (existingUser) throw new BadRequestException(this.i18n.t(`d.errors.${type}.is_exist`));

		return true;
	}

	async updateProfile(id: string, dto: Prisma.UserUpdateInput) {
		if (dto.username) {
			const isExists = await this.getProfile(dto.username as string, "username");
			if (isExists) throw new BadRequestException(this.i18n.t("d.errors.username.is_exist"));
		}

		if (dto.phoneNumber) {
			const isExists = await this.getProfile(dto.phoneNumber as string, "phone");
			if (isExists) throw new BadRequestException(this.i18n.t("d.errors.profile.phone_number_is_exist"));
		}

		await this.prisma.user.update({ where: { id }, data: dto });

		return true;
	}

	async updateSettings(userId: string, dto: UpdateUserSettingsDto) {
		const settings = await this.prisma.userSettings.findUnique({ where: { userId } });

		if (!settings) throw new NotFoundException(this.i18n.t("d.errors.profile.settings_not_found"));

		if (typeof dto.isTFAEnabled === "boolean") {
			const { isTFAEnabled, ...other } = dto;

			await this.prisma.user.update({ where: { id: userId }, data: { isTFAEnabled } });

			await this.prisma.userSettings.update({ where: { id: settings.id }, data: other });
		} else {
			const { isTFAEnabled, ...other } = dto;

			await this.prisma.userSettings.update({ where: { id: settings.id }, data: other });
		}

		return true;
	}

	async updatePassword(userId: string, password: string) {
		const user = await this.getProfile(userId, "id");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"));

		await this.prisma.user.update({ where: { id: user.id }, data: { password: await hash(password) } });

		return user;
	}

	async updateProfileVerified(id: string) {
		await this.prisma.user.update({
			where: { id },
			data: { isVerified: true },
		});

		return true;
	}
}
