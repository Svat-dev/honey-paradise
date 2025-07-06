import * as fs from "fs";
import * as path from "path";
import * as sharp from "sharp";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import type { Prisma } from "@prisma/client";
import { hash } from "argon2";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { DEFAULT_AVATAR_PATH } from "src/shared/lib/common/constants";

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

	async updateProfile(id: string, dto: Prisma.UserUpdateInput) {
		if (dto.username) {
			const isExists = await this.getProfile(dto.username as string, "username");
			if (isExists) throw new BadRequestException(this.i18n.t("d.errors.username_is_exist"));
		}

		if (dto.phoneNumber) {
			const isExists = await this.getProfile(dto.phoneNumber as string, "phone");
			if (isExists) throw new BadRequestException(this.i18n.t("d.errors.profile.phone_number_is_exist"));
		}

		await this.prisma.user.update({ where: { id }, data: dto });

		return true;
	}

	async updateSettings(userId: string, dto: Prisma.UserSettingsUpdateInput) {
		const settings = await this.prisma.userSettings.findUnique({ where: { userId } });

		if (!settings) throw new NotFoundException("Не найдено настроек пользователя, обратитесь в поддержку");

		await this.prisma.userSettings.update({ where: { id: settings.id }, data: dto });

		return true;
	}

	async updateProfileVerified(id: string) {
		await this.prisma.user.update({
			where: { id },
			data: { isVerified: true },
		});

		return true;
	}

	async updateProfilePassword(id: string, password: string) {
		await this.prisma.user.update({
			where: { id },
			data: { password: await hash(password) },
		});

		return true;
	}
}
