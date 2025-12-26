import { EnumPromoTokenDiscountType, EnumPromoTokenTypes } from "@prisma/client";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, Min } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreatePromoCodeDto {
	@ApiProperty({ type: "string", example: "SOME_PROMO_CODE" })
	@IsString({ message: "" })
	@Length(3, 50, { message: "" })
	@Matches(/^[a-zA-Z0-9_-]+$/)
	@IsOptional()
	token?: string;

	@ApiProperty({ enum: EnumPromoTokenTypes, example: EnumPromoTokenTypes.PERSONAL })
	@IsNotEmpty({ message: "" })
	@IsEnum(EnumPromoTokenTypes, { message: "" })
	type: EnumPromoTokenTypes;

	@ApiProperty({ type: "number", example: 0.25 })
	@IsNumber({ allowInfinity: false, allowNaN: false }, { message: "" })
	@Min(0, { message: "" })
	@Max(1, { message: "" })
	@IsOptional()
	discount?: number;

	@ApiProperty({ enum: EnumPromoTokenDiscountType, example: EnumPromoTokenDiscountType.ALL })
	@IsNotEmpty({ message: "" })
	@IsEnum(EnumPromoTokenDiscountType, { message: "" })
	discountType: EnumPromoTokenDiscountType;

	@ApiProperty({ type: "string", description: "ISO date string", example: new Date() })
	@IsNotEmpty({ message: "" })
	@IsDateString({}, { message: "Not date!" })
	expiresAt: string;
}
