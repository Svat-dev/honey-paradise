import { ApiProperty } from "@nestjs/swagger";
import { type Cart, type CartItem, EnumCurrencies } from "@prisma/client";
import type { JsonValue } from "@prisma/client/runtime/library";
import { ApiJsonValue } from "src/shared/types/swagger.type";

export class GetMyCartProductResponse {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string;

	@ApiProperty({ type: ApiJsonValue, description: "" })
	title: JsonValue;

	@ApiProperty({ type: "string", description: "", example: "slugged-value" })
	slug: string;

	@ApiProperty({ type: "string", description: "", example: ["image1", "image2"], isArray: true })
	images: string[];
}

export class GetMyCartItemsResponse implements Partial<CartItem> {
	@ApiProperty({ type: "string", description: "", example: "nanoid" })
	id: string;

	@ApiProperty({ type: GetMyCartProductResponse, description: "" })
	product: GetMyCartProductResponse;

	@ApiProperty({ type: "number", description: "Quantity of the products", example: 1 })
	priceInUSD: number;

	@ApiProperty({ type: "number", description: "Price of the product", example: 10.99 })
	quantity: number;

	@ApiProperty({ type: Date, description: "", example: new Date() })
	createdAt: Date;
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

	@ApiProperty({ type: "number", description: "", example: 100 })
	deliveryPrice: number;

	@ApiProperty({ type: "number", description: "", example: 0.25 })
	discount: number;

	@ApiProperty({ type: GetMyCartItemsResponse, isArray: true, description: "" })
	cartItems: GetMyCartItemsResponse[];

	@ApiProperty({ type: Date, description: "", example: new Date() })
	createdAt: Date;
}
