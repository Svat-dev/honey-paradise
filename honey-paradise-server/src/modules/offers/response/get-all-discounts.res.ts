import { ApiProperty } from "@nestjs/swagger";
import { type Discount, EnumDiscountType } from "@prisma/client";
import type { JsonValue } from "@prisma/client/runtime/library";
import { ApiJsonValue } from "src/shared/types/swagger.type";

export class GetAllDiscountsResponseProduct {
	@ApiProperty({ type: "string", example: "uuid" })
	id: string;

	@ApiProperty({ type: ApiJsonValue })
	title: JsonValue;

	@ApiProperty({ type: "string", example: "slugged-value" })
	slug: string;
}

export class GetAllDiscountsResponse implements Partial<Discount> {
	@ApiProperty({ type: "string", example: "uuid" })
	id: string;

	@ApiProperty({ enum: EnumDiscountType, example: EnumDiscountType.SELLOUT })
	type: EnumDiscountType;

	@ApiProperty({ type: "number", example: 0.2 })
	discount: number;

	@ApiProperty({ type: GetAllDiscountsResponseProduct, isArray: true })
	products: GetAllDiscountsResponseProduct[];

	@ApiProperty({ type: "string", example: new Date() })
	expiresAt: Date;
}
