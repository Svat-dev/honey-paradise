import { ApiProperty } from "@nestjs/swagger"
import { EnumOrderStatus, EnumTransactionStatus } from "@prisma/client"

class TransactionStatus {
	@ApiProperty({
		enum: EnumTransactionStatus,
		description: "",
		example: EnumTransactionStatus.SUCCEEDED
	})
	status: EnumTransactionStatus
}

class OrderItem {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	pid: string

	@ApiProperty({ type: "number", description: "", example: 2 })
	quantity: number

	@ApiProperty({ type: "number", description: "", example: 10 })
	priceInUsd: number
}

export class GetAllOrdersResponse {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string

	@ApiProperty({ type: "number", description: "", example: 1000 })
	totalAmount: number

	@ApiProperty({
		enum: EnumOrderStatus,
		description: "",
		example: EnumOrderStatus.PENDING
	})
	status: EnumOrderStatus

	@ApiProperty({ type: OrderItem, description: "", isArray: true })
	items: OrderItem[]

	@ApiProperty({ type: TransactionStatus, description: "" })
	transaction: TransactionStatus

	@ApiProperty({ type: Date, description: "", example: new Date() })
	createdAt: Date
}
