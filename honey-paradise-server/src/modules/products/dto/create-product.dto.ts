import { ApiProperty } from "@nestjs/swagger"
import type { Product } from "@prisma/client"
import type { JsonValue } from "@prisma/client/runtime/library"
import {
	IsJSON,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString
} from "class-validator"

export class CreateProductDto implements Partial<Product> {
	@ApiProperty({ type: "string", description: "", example: "nanoid" })
	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	categoryId: string

	@ApiProperty({
		type: "string",
		description: "",
		example: '{"en": "Title", "ru": "Название"}'
	})
	@IsJSON({ message: "" })
	title: JsonValue

	@ApiProperty({
		type: "string",
		description: "",
		example: "slugged-value",
		required: false
	})
	@IsString({ message: "" })
	slug: string

	@ApiProperty({
		type: "string",
		description: "",
		example: '{"en": "Description", "ru": "Описание"}',
		required: false
	})
	@IsJSON({ message: "" })
	@IsOptional()
	description?: JsonValue

	@ApiProperty({ type: "number", description: "", example: 10 })
	@IsNotEmpty({ message: "" })
	@IsNumber({}, { message: "" })
	priceInUsd: number
}
