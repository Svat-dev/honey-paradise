import type { Category, Product } from "@prisma/client";

import { ApiJsonValue } from "src/shared/types/swagger.type";
import { ApiProperty } from "@nestjs/swagger";
import type { JsonValue } from "@prisma/client/runtime/library";

export class GetAllProductsResponse implements Partial<Product> {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string;

	@ApiProperty({ type: ApiJsonValue, description: "" })
	title: JsonValue;

	@ApiProperty({ type: ApiJsonValue, description: "" })
	description: JsonValue;

	@ApiProperty({ type: "string", description: "", example: "slugged-value" })
	slug: string;

	@ApiProperty({ type: "string", description: "", example: ["image1", "image2"], isArray: true })
	images: string[];

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

	@ApiProperty({ type: ApiJsonValue, description: "" })
	title: JsonValue;

	@ApiProperty({ type: "string", description: "", example: "slugged-value" })
	slug: string;

	@ApiProperty({ type: GetAllProductsResponse, description: "", isArray: true })
	products: GetAllProductsResponse[];

	@ApiProperty({ type: "number", description: "", example: 10 })
	productsLength: number;
}
