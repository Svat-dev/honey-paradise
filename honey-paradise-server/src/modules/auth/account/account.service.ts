import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import type { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProfileService } from "../profile/profile.service";
import { getEmailUsername } from "src/shared/lib/common/utils/get-email-username.util";
import { hash } from "argon2";
import { userFullOutput } from "src/shared/lib/prisma/outputs/user.output";

@Injectable()
export class AccountService {
	constructor(private readonly prisma: PrismaService, private readonly profileService: ProfileService) {}

	async me(id: string) {
		const user = await this.prisma.user.findUnique({ where: { id }, select: userFullOutput });

		return user;
	}

	async create(dto: CreateUserDto) {
		const { email, password, birthdate, gender, username } = dto;

		const isEmailExist = await this.profileService.getProfile(email, "email");
		if (isEmailExist) throw new BadRequestException("email_is_exist");

		const isUsernameExist = username ? await this.profileService.getProfile(username, "username") : false;
		if (isUsernameExist) throw new BadRequestException("username_is_exist");

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

		return true;
	}
}
