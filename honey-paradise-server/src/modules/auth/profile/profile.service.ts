import * as fs from "fs";
import * as path from "path";
import * as sharp from "sharp";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { hash } from "argon2";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class ProfileService {
	constructor(private readonly prisma: PrismaService) {}

	async deleteAvatar(userId: string) {}

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

		if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

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

	async getProfile(id: string, type: "email" | "username" | "id") {
		if (type === "id") {
			const profile = await this.prisma.user.findUnique({ where: { id } });

			return profile;
		} else if (type === "email") {
			const profile = await this.prisma.user.findUnique({ where: { email: id } });

			return profile;
		} else {
			const profile = await this.prisma.user.findUnique({ where: { username: id } });

			return profile;
		}
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
