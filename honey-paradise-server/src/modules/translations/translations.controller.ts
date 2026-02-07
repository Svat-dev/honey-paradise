import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import { Get } from "@nestjs/common/decorators/http/request-mapping.decorator"
import {
	Param,
	Query
} from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ParseUUIDPipe } from "@nestjs/common/pipes/parse-uuid.pipe"
import {
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags
} from "@nestjs/swagger"
import { SkipThrottle } from "@nestjs/throttler/dist/throttler.decorator"
import { I18nLang } from "nestjs-i18n"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { TranslateModelPipe } from "src/shared/pipes/translate-model.pipe"

import { TranslateResponse } from "./response/translate.res"
import { TranslationsService } from "./translations.service"

@ApiTags("Translations")
@SkipThrottle({ auth: true })
@Controller("/translate")
export class TranslationsController {
	constructor(private readonly translationsService: TranslationsService) {}

	@ApiOperation({ summary: "Translate by ID" })
	@ApiQuery({
		name: "model",
		enum: ["review", "commentary"],
		example: "review"
	})
	@ApiParam({ name: "id", type: String, example: "uuid" })
	@ApiResponse({ type: TranslateResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization("ADMIN", "MANAGER", "VIP")
	@Get("/:id")
	translate(
		@Param("id", ParseUUIDPipe) id: string,
		@Query("model", TranslateModelPipe) model: "review" | "commentary",
		@I18nLang() lang: string
	) {
		return this.translationsService.translateById(id, lang, model)
	}
}
