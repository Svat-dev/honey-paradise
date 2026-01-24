import type {
  ArgumentMetadata,
  PipeTransform,
} from "@nestjs/common/interfaces/features/pipe-transform.interface";
import { isNotEmpty, isUUID } from "class-validator";

import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";

export class ProductsIdsParserPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException("ids list must be not empty"); // TODO: Add error message

    const parsed = value.split(",");

    for (const id of parsed) {
      if (!isUUID(id) || !isNotEmpty(id))
        throw new BadRequestException("string must be uuid and not empty"); // TODO: Add error message
    }

    return parsed;
  }
}
