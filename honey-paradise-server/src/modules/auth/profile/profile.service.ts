import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
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
}
