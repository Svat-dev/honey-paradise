import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderResponse {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	orderId: string

	@ApiProperty({ type: "number", description: "In usd", example: 100 })
	totalAmount: number
}
