import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import type {
	ArgumentMetadata,
	PipeTransform
} from "@nestjs/common/interfaces/features/pipe-transform.interface"
import { isNotEmpty } from "class-validator"

import { verifyNanoid } from "../lib/common/utils/verify-nanoid.util"

export class ProductVariantIdParserPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (!value || !isNotEmpty(value))
			throw new BadRequestException("variant id mustn't be empty") // TODO: Add error message

		if (!verifyNanoid(value)) {
			throw new BadRequestException("value must be valid nanoid") // TODO: Add error message
		}

		return value
	}
}
