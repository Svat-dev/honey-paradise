import type { Category, Product } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";
import type { JsonValue } from "@prisma/client/runtime/library";

export class GetAllProductsResponse implements Partial<Product> {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string;

	@ApiProperty({ type: "string", description: "", example: '{"en": "Title", "ru": "Название"}' })
	title: JsonValue;

	@ApiProperty({ type: "string", description: "", example: '{"en": "Description", "ru": "Описание"}' })
	description: JsonValue;

	@ApiProperty({ type: "number", description: "", example: 10 })
	priceInUsd: number;

	@ApiProperty({ type: "number", description: "", example: 9.3 })
	rating: number;

	@ApiProperty({
		type: "object",
		properties: { comments: { type: "number", description: "" } },
		description: "",
		example: { comments: 100 },
	})
	_count: {
		comments: number;
	};
}

export class GetCatsWithProductsResponse implements Partial<Category> {
	@ApiProperty({ type: "string", description: "", example: "nanoid" })
	id: string;

	@ApiProperty({ type: "string", description: "", example: '{"en": "Title", "ru": "Название"}' })
	title: JsonValue;

	@ApiProperty({ type: "string", description: "", example: "slug" })
	slug: string;

	@ApiProperty({ type: GetAllProductsResponse, description: "", isArray: true })
	products: GetAllProductsResponse[];
}
