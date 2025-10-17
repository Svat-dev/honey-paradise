import { ApiProperty } from "@nestjs/swagger";
import { type Cart, type CartItem, EnumCurrencies } from "@prisma/client";

export class GetMyCartItemsResponse implements Partial<CartItem> {
	@ApiProperty({ type: "string", description: "", example: "nanoid" })
	id: string;

	@ApiProperty({ type: "string", description: "", example: "uuid" })
	productId: string;

	@ApiProperty({ type: "number", description: "Quantity of the products", example: 1 })
	priceInUSD: number;

	@ApiProperty({ type: "number", description: "Price of the product", example: 10.99 })
	quantity: number;

	@ApiProperty({ type: Date, description: "", example: new Date() })
	createdAt: Date;

	@ApiProperty({ type: Date, description: "", example: new Date() })
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

	@ApiProperty({ type: GetMyCartItemsResponse, isArray: true, description: "" })
	cartItems: GetMyCartItemsResponse[];

	@ApiProperty({ type: Date, description: "", example: new Date() })
	createdAt: Date;

	@ApiProperty({ type: Date, description: "", example: new Date() })
	updatedAt: Date;
}
