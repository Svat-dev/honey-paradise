import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator"

export const PaymentSortType = {
	ASC: "asc",
	DESC: "desc"
} as const

export const PaymentSortField = {
	AMOUNT: "amount",
	UPDATED_AT: "updatedAt",
	CREATED_AT: "createdAt"
} as const

type PaymentSortType = (typeof PaymentSortType)[keyof typeof PaymentSortType]
type PaymentSortField = (typeof PaymentSortField)[keyof typeof PaymentSortField]

export class GetAllPaymentsQueryDto {
	@IsEnum(PaymentSortType, { message: "Invalid sort type" })
	@IsOptional()
	@ApiProperty({ enum: PaymentSortType, example: PaymentSortType.DESC })
	type?: PaymentSortType

	@IsEnum(PaymentSortField, { message: "Invalid sort field" })
	@IsOptional()
	@ApiProperty({ enum: PaymentSortField, example: PaymentSortField.CREATED_AT })
	field?: PaymentSortField

	@IsString({ message: "Visible statuses must be a string" })
	@IsOptional()
	@ApiProperty({
		type: "string",
		description: "Visible statuses split by comma",
		example: "0,1,2"
	})
	status?: string

	@IsString({ message: "Search query must be a string" })
	@MaxLength(128, { message: "Search query must be less than 128 characters" })
	@IsOptional()
	@ApiProperty({ type: "string", description: "Search query", example: "" })
	q?: string
}

export const defaultPaymentsQuery: GetAllPaymentsQueryDto = {
	type: PaymentSortType.DESC,
	field: PaymentSortField.CREATED_AT,
	status: "0,1,2",
	q: ""
}
