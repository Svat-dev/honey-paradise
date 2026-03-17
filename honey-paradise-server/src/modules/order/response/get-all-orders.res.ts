import { ApiProperty } from "@nestjs/swagger"
import { EnumOrderStatus, type Order } from "@prisma/client"

export class GetAllOrdersResponse implements Partial<Order> {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string

	@ApiProperty({
		type: "number",
		description: "Index of an order, count is only for user. Not global",
		example: 1
	})
	index: number

	@ApiProperty({
		enum: EnumOrderStatus,
		description: "",
		example: EnumOrderStatus.PENDING
	})
	status: EnumOrderStatus

	@ApiProperty({ type: "number", description: "", example: 1 })
	length: number

	@ApiProperty({ description: "", example: new Date() })
	createdAt: Date
}
