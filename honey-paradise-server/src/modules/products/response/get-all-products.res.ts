import type { Category, Product } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";
import type { JsonValue } from "@prisma/client/runtime/library";
import { ApiJsonValue } from "src/shared/types/swagger.type";

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

export class GetAllCatsResponse implements Partial<Category> {
	@ApiProperty({ type: "string", description: "", example: "nanoid" })
	id: string;

	@ApiProperty({ type: ApiJsonValue, description: "" })
	title: JsonValue;

	@ApiProperty({ type: "string", description: "", example: "slugged-value" })
	slug: string;

	@ApiProperty({ type: "string", description: "", example: "image" })
	image: string;

	@ApiProperty({ type: GetAllProductsResponse, description: "", isArray: true })
	products: GetAllProductsResponse[];

	@ApiProperty({ type: "number", description: "", example: 10 })
	productsLength: number;
}

export class GetCatsWithProductsResponse {
	@ApiProperty({ type: GetAllCatsResponse, description: "", isArray: true })
	categories: GetAllCatsResponse[];

	@ApiProperty({ type: "number", description: "", example: 3 })
	categoriesLength: number;

	@ApiProperty({ type: "number", description: "", example: 20 })
	allProductsLength: number;
}
