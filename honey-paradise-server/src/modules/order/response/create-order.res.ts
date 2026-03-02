import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderResponse {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	orderId: string

	@ApiProperty({ type: "number", description: "In usd", example: 100 })
	totalAmount: number

	@ApiProperty({
		type: "string",
		description: "Yookassa payment confirmation URL",
		example: "http://example.com/confirmation"
	})
	confirmation_url: string
}
