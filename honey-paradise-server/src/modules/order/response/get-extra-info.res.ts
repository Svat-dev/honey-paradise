import { ApiProperty } from "@nestjs/swagger"
import { EnumTransactionStatus } from "@prisma/client"
import type { JsonValue } from "@prisma/client/runtime/library"
import { ApiJsonValue } from "src/shared/types/swagger.type"

class GetExtraOrderInfoItemProduct {
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
}

class GetExtraOrderInfoItem {
	@ApiProperty({
		type: "string",
		description: "Product variant Nano ID",
		example: "nanoid"
	})
	id: string

	@ApiProperty({
		type: "number",
		description: "Product variant article",
		example: 111
	})
	art: number

	@ApiProperty({ type: "number", description: "", example: 1 })
	quantity: number

	@ApiProperty({
		type: "number",
		description: "Product variant weight in grams",
		example: 250
	})
	weight: number

	@ApiProperty({ type: "number", description: "", example: 100 })
	price: number

	@ApiProperty({ type: GetExtraOrderInfoItemProduct })
	product: GetExtraOrderInfoItemProduct
}

class GetExtraOrderInfoTransaction {
	@ApiProperty({ type: "string", description: "Payment's id", example: "uuid" })
	id: string

	@ApiProperty({ type: "number", description: "", example: 10.99 })
	amount: number

	@ApiProperty({
		enum: EnumTransactionStatus,
		example: EnumTransactionStatus.PENDING
	})
	status: EnumTransactionStatus

	@ApiProperty({ description: "", example: new Date() })
	createdAt: Date
}

export class GetExtraOrderInfo {
	@ApiProperty({ type: GetExtraOrderInfoTransaction })
	transaction: GetExtraOrderInfoTransaction

	@ApiProperty({ type: GetExtraOrderInfoItem, isArray: true })
	items: GetExtraOrderInfoItem[]
}
