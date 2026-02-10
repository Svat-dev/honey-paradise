import { ApiProperty } from "@nestjs/swagger"
import { type Discount, EnumDiscountType } from "@prisma/client"
import {
	ArrayNotEmpty,
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsUUID,
	Max,
	Min
} from "class-validator"

export class CreateDiscountDto implements Partial<Discount> {
	@ApiProperty({ enum: EnumDiscountType, example: EnumDiscountType.SELLOUT })
	@IsNotEmpty({ message: "" })
	@IsEnum(EnumDiscountType, { message: "" })
	type: EnumDiscountType

	@ApiProperty({ type: "number", example: 0.25 })
	@IsNotEmpty({ message: "" })
	@IsNumber({ allowInfinity: false, allowNaN: false }, { message: "" })
	@Min(0, { message: "" })
	@Max(1, { message: "" })
	discount: number

	@ApiProperty({
		type: "string",
		example: ["uuid-1", "uuid-2", "..."],
		isArray: true
	})
	@IsNotEmpty({ message: "" })
	@ArrayNotEmpty({ message: "" })
	@IsUUID(4, { each: true, message: "" })
	productIds: string[]

	@ApiProperty({ type: Date, example: new Date() })
	@IsDateString({}, { message: "" })
	@IsOptional()
	expiresAt?: Date
}
