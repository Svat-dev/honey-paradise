import type { ArgumentMetadata, PipeTransform } from "@nestjs/common/interfaces/features/pipe-transform.interface";
import { ALLOWED_AVATAR_FILE_FORMATS, ALLOWED_AVATAR_FILE_SIZE } from "../lib/common/constants/file.const";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { validateFileFormat } from "../lib/common/utils/file.util";

@Injectable()
export class AvatarFileValidationPipe implements PipeTransform {
	constructor(private readonly i18n: I18nService) {}

	public async transform(value: any, metadata: ArgumentMetadata) {
		const filename = value?.originalname || value?.name;
		if (!filename) throw new BadRequestException(this.i18n.t("d.errors.files.avatar.empty"));

		const isFileFormatValid = validateFileFormat(filename, ALLOWED_AVATAR_FILE_FORMATS);

		if (!isFileFormatValid) throw new BadRequestException(this.i18n.t("d.errors.files.avatar.unsupported_type"));

		const isFileSizeValid = value.size <= ALLOWED_AVATAR_FILE_SIZE;

		if (!isFileSizeValid) throw new BadRequestException(this.i18n.t("d.errors.files.avatar.too_big"));

		return value;
	}
}
