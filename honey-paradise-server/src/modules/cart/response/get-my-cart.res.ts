import { ApiProperty } from "@nestjs/swagger";
import { type Cart, type CartItem, EnumCurrencies } from "@prisma/client";

export class GetMyCartItemsResponse implements Partial<CartItem> {
	@ApiProperty({ type: "number", description: "", example: 1 })
	id: number;

	@ApiProperty({ description: "", example: new Date() })
	createdAt: Date;

	@ApiProperty({ description: "", example: new Date() })
	updatedAt: Date;
}

export class GetMyCartResponse implements Partial<Cart> {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string;

	@ApiProperty({ enum: EnumCurrencies, description: "", example: EnumCurrencies.DOLLAR })
	currency: EnumCurrencies;

	@ApiProperty({ type: "number", description: "", example: 12 })
	length: number;

	@ApiProperty({ type: "number", description: "", example: 1200 })
	totalPrice: number;

	@ApiProperty({ type: GetMyCartItemsResponse, isArray: true, description: "", example: [] })
	cartItems: GetMyCartItemsResponse[];

	@ApiProperty({ description: "", example: new Date() })
	createdAt: Date;

	@ApiProperty({ description: "", example: new Date() })
	updatedAt: Date;
}
