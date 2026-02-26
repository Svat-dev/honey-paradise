import { ApiProperty } from "@nestjs/swagger"
import { JsonValue } from "@prisma/client/runtime/library"
import { ApiJsonValue } from "src/shared/types/swagger.type"

class GetFavoriteProductsResponseProduct {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string

	@ApiProperty({ type: ApiJsonValue, description: "" })
	title: JsonValue

	@ApiProperty({ type: "string", description: "", example: "slugged-value" })
	slug: string

	@ApiProperty({
		type: "string",
		description: "",
		example: ["image1", "image2"],
		isArray: true
	})
	images: string[]

	@ApiProperty({ type: "number", description: "", example: 19.99 })
	priceInUsd: number

	@ApiProperty({ type: "string", description: "", example: "nanoid" })
	variantId: string

	@ApiProperty({ type: "number", description: "", example: 10 })
	article: number

	@ApiProperty({ type: "number", description: "", example: 500 })
	weight: number
}

export class GetFavoriteProductsResponse {
	@ApiProperty({
		type: "number",
		description: "Total number of favorite products",
		example: 100
	})
	total: number

	@ApiProperty({
		type: "number",
		description: "Number of favorite products returned",
		example: 10
	})
	length: number

	@ApiProperty({
		type: GetFavoriteProductsResponseProduct,
		description: "List of favorite products",
		isArray: true
	})
	products: GetFavoriteProductsResponseProduct[]
}
