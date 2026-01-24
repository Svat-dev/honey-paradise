import type {
  ArgumentMetadata,
  PipeTransform,
} from "@nestjs/common/interfaces/features/pipe-transform.interface";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";

@Injectable()
export class SettingsFileFormatPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const formats = ["yml", "json"];

    if (formats.includes(value)) return value;
    else
      throw new BadRequestException(
        `Value ${value} is incorrect settings file extension!`,
      );
  }
}
