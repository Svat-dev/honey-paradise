import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { verify } from "argon2";
import type { Request } from "express";
import { PrismaService } from "src/core/prisma/prisma.service";
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util";
import { saveSession } from "src/shared/lib/common/utils/session.util";
import { userServerOutput } from "src/shared/lib/prisma/outputs/user.output";
import type { AuthLoginDto } from "./dto/auth-login.dto";

@Injectable()
export class SessionsService {
	constructor(private readonly prisma: PrismaService) {}

	async login(dto: AuthLoginDto, req: Request, userAgent: string) {
		const { id } = dto;

		const user = await this.prisma.user.findFirst({
			where: {
				OR: [{ username: { equals: id } }, { email: { equals: id } }],
			},
			select: userServerOutput,
		});

		if (!user) throw new NotFoundException("Пользователь не был найден");

		const { password, ..._user } = user;
		const isValidPassword = await verify(user.password, dto.password);

		if (!isValidPassword) throw new UnauthorizedException("Неверный пароль");

		const metadata = getSessionMetadata(req, userAgent);

		return saveSession(req, _user, metadata);
	}
}
