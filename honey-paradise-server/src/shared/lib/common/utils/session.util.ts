import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import type { ConfigService } from "@nestjs/config/dist/config.service";
import type { User } from "@prisma/client";
import type { Request } from "express";
import type { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import type { SessionMetadata } from "src/shared/types/session-metadata.type";

export function saveSession(req: Request, user: Partial<User>, metadata: SessionMetadata, i18n: I18nService) {
	return new Promise((resolve, reject) => {
		req.session.createdAt = new Date();
		req.session.userId = user.id;
		req.session.metadata = metadata;

		req.session.save(err => {
			if (err) return reject(new InternalServerErrorException(i18n.t("d.errors.500.cant_save_session")));

			resolve({ tfa: false });
		});
	});
}

export function destroySession(req: Request, configService: ConfigService, i18n: I18nService) {
	return new Promise((resolve, reject) => {
		req.session.destroy(err => {
			if (err) return reject(new InternalServerErrorException(i18n.t("d.errors.500.cant_save_session")));

			req.res.clearCookie(configService.getOrThrow<string>("SESSION_NAME"));

			resolve(true);
		});
	});
}
