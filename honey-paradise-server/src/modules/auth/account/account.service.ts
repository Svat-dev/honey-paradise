import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { hash } from "argon2";
import { PrismaService } from "src/core/prisma/prisma.service";
import { getEmailUsername } from "src/shared/lib/common/utils/get-email-username.util";
import { ProfileService } from "../profile/profile.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AccountService {
	constructor(private readonly prisma: PrismaService, private readonly profileService: ProfileService) {}

	async findAll() {
		const users = await this.prisma.user.findMany();

		return users;
	}

	async create(dto: CreateUserDto) {
		const { email, password, birthdate, gender, username } = dto;

		const isEmailExist = await this.profileService.getProfile(email, "email");
		if (isEmailExist) throw new BadRequestException("Пользователь с такой эл. почтой уже существует");

		const isUsernameExist = username ? await this.profileService.getProfile(username, "username") : false;
		if (isUsernameExist) throw new BadRequestException("Пользователь с таким именем уже существует");

		const newUser = await this.prisma.user.create({
			data: {
				email,
				password: await hash(password),
				username: username || getEmailUsername(email),
				birthdate,
				gender,
			},
		});

		return true;
	}
}
