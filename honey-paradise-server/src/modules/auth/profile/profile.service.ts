import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { hash } from "argon2";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class ProfileService {
	constructor(private readonly prisma: PrismaService) {}

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
