import { ALLOWED_FILE_FORMATS, ALLOWED_FILE_SIZE } from "../lib/common/constants/file.const";
import type { ArgumentMetadata, PipeTransform } from "@nestjs/common/interfaces/features/pipe-transform.interface";

import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { validateFileFormat } from "../lib/common/utils/file.util";

@Injectable()
export class FileValidationPipe implements PipeTransform {
	public async transform(value: any, metadata: ArgumentMetadata) {
		const filename = value?.originalname || value?.name;
		if (!filename) throw new BadRequestException("Файл не загружен");

		const isFileFormatValid = validateFileFormat(filename, ALLOWED_FILE_FORMATS);

		if (!isFileFormatValid) throw new BadRequestException("Неподдерживаемый формат файла");

		const isFileSizeValid = value.size <= ALLOWED_FILE_SIZE;

		if (!isFileSizeValid) throw new BadRequestException("Размер файла превышает 10 МБ");

		return value;
	}
}
