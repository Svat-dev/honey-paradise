import type {
  ArgumentMetadata,
  PipeTransform,
} from "@nestjs/common/interfaces/features/pipe-transform.interface";
import {
  ALLOWED_USER_SETTINGS_FILE_FORMATS,
  ALLOWED_USER_SETTINGS_FILE_SIZE,
} from "../lib/common/constants/file.const";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { validateFileFormat } from "../lib/common/utils/file.util";

@Injectable()
export class UserSettingsFileValidationPipe implements PipeTransform {
  constructor(private readonly i18n: I18nService) {}

  public async transform(value: any, metadata: ArgumentMetadata) {
    const filename = value?.originalname || value?.name;
    if (!filename)
      throw new BadRequestException("User settings file is empty!");

    const isFileFormatValid = validateFileFormat(
      filename,
      ALLOWED_USER_SETTINGS_FILE_FORMATS,
    );

    if (!isFileFormatValid)
      throw new BadRequestException("Unsupported user settings file format!");

    const isFileSizeValid = value.size <= ALLOWED_USER_SETTINGS_FILE_SIZE;

    if (!isFileSizeValid)
      throw new BadRequestException("User settings file is too big!");

    return value;
  }
}
