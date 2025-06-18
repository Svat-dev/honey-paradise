import { Catch } from "@nestjs/common/decorators/core/catch.decorator";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import type { ExceptionFilter } from "@nestjs/common/interfaces/exceptions/exception-filter.interface";
import type { ArgumentsHost } from "@nestjs/common/interfaces/features/arguments-host.interface";
import { Logger } from "@nestjs/common/services/logger.service";
import type { Response } from "express";
import { I18nContext } from "nestjs-i18n/dist/i18n.context";
import { I18nTranslation } from "nestjs-i18n/dist/interfaces/i18n-translation.interface";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger("AppExceptions");

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const i18nCtx = I18nContext.current<I18nTranslation>(host);
		const response = ctx.getResponse() as Response;

		const status = exception instanceof HttpException ? exception.getStatus() : 500;
		const message = exception instanceof HttpException ? exception.message : i18nCtx.t("d.errors.500" as never);

		this.logger.error(message, exception);

		response.status(status).json({
			status,
			message,
			timestamp: new Date().toISOString(),
			path: ctx.getRequest().url,
		});
	}
}
