import { destroySession, saveSession } from "src/shared/lib/common/utils/session.util";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { verify } from "argon2";
import type { Request } from "express";
import { PrismaService } from "src/core/prisma/prisma.service";
import { getSessionMetadata } from "src/shared/lib/common/utils/session-metadat.util";
import { userServerOutput } from "src/shared/lib/prisma/outputs/user.output";
import type { AuthLoginDto } from "./dto/auth-login.dto";

@Injectable()
export class SessionsService {
	constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {}

	async login(dto: AuthLoginDto, req: Request, userAgent: string) {
		const { id } = dto;

		const user = await this.prisma.user.findFirst({
			where: {
				OR: [{ username: { equals: id } }, { email: { equals: id } }],
			},
			select: userServerOutput,
		});

		if (!user) throw new NotFoundException("account_not_found");

		const { password, ..._user } = user;
		const isValidPassword = await verify(user.password, dto.password);

		if (!isValidPassword) throw new UnauthorizedException("invalid_password");

		const metadata = getSessionMetadata(req, userAgent);

		return saveSession(req, _user, metadata);
	}

	async logout(req: Request) {
		return destroySession(req, this.configService);
	}

	async clearSession(req: Request) {
		req.res.clearCookie(this.configService.getOrThrow<string>("SESSION_NAME"));

		return true;
	}
}
