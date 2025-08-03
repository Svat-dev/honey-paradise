import type { ArgumentMetadata, PipeTransform } from "@nestjs/common/interfaces/features/pipe-transform.interface";

import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";

export class UniqueFieldCheckPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		const fields = ["email", "username", "phone"];

		if (fields.includes(value)) return value;
		else throw new NotFoundException(`Not Found ${metadata.data} with value ${value}`);
	}
}
