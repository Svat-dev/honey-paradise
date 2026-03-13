import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength
} from "class-validator"

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
	@ApiProperty({ enum: PaymentSortType, example: PaymentSortType.DESC })
	@IsEnum(PaymentSortType, { message: "Invalid sort type" })
	@IsOptional()
	type?: PaymentSortType

	@ApiProperty({ enum: PaymentSortField, example: PaymentSortField.CREATED_AT })
	@IsEnum(PaymentSortField, { message: "Invalid sort field" })
	@IsOptional()
	field?: PaymentSortField

	@ApiProperty({
		type: "string",
		description: "Visible statuses split by comma",
		example: "0,1,2"
	})
	@IsString({ message: "Visible statuses must be a string" })
	@IsOptional()
	status?: string

	@ApiProperty({ type: "string", description: "Search query", example: "" })
	@IsString({ message: "Search query must be a string" })
	@MaxLength(128, { message: "Search query must be less than 128 characters" })
	@IsOptional()
	q?: string

	@ApiProperty({ type: "number", description: "Page number", example: 1 })
	@IsNumber({}, { message: "Page must be a number" })
	@Transform(({ value }) => parseInt(value, 10))
	@IsOptional()
	page?: number
}

export const defaultPaymentsQuery: GetAllPaymentsQueryDto = {
	type: PaymentSortType.DESC,
	field: PaymentSortField.CREATED_AT,
	status: "0,1,2",
	page: 1,
	q: ""
}
