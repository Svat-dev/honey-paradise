import { ApiProperty } from "@nestjs/swagger"
import { EnumTransactionStatus } from "@prisma/client"
import { PaymentMethodsEnum } from "nestjs-yookassa"

class GetAllPaymentsResponseMethodCard {
	@ApiProperty({ type: "string", description: "", example: "MasterCard" })
	type: string

	@ApiProperty({
		type: "string",
		description: "Last 4 card symbols",
		example: "4444"
	})
	number: string
}

class GetAllPaymentsResponseMethod {
	@ApiProperty({
		enum: PaymentMethodsEnum,
		example: PaymentMethodsEnum.BANK_CARD
	})
	type: PaymentMethodsEnum

	@ApiProperty({ type: GetAllPaymentsResponseMethodCard })
	card: GetAllPaymentsResponseMethodCard
}

export class GetAllPaymentsResponse {
	@ApiProperty({ type: "string", description: "Payment's id", example: "uuid" })
	id: string

	@ApiProperty({
		enum: EnumTransactionStatus,
		example: EnumTransactionStatus.PENDING
	})
	status: EnumTransactionStatus

	@ApiProperty({ type: "number", description: "", example: 10.99 })
	amount: number

	@ApiProperty({
		type: "string",
		description: "Short description of payment from Yookassa",
		example: "Short description"
	})
	description: string

	@ApiProperty({ type: GetAllPaymentsResponseMethod })
	method: GetAllPaymentsResponseMethod

	@ApiProperty({ type: "string", description: "", example: new Date() })
	capturedAt: string

	@ApiProperty({ type: "string", description: "", example: new Date() })
	createdAt: string
}
