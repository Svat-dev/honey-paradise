import { ApiProperty } from "@nestjs/swagger"
import type { CartItem } from "@prisma/client"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class AddCartItemDto implements Partial<CartItem> {
	@ApiProperty({
		type: "number",
		description: "Quantity of the products",
		example: 1
	})
	@IsNotEmpty()
	@IsInt({ message: "Quantity must be a number" })
	quantity: number

	@ApiProperty({
		type: "string",
		description: "Product variant ID",
		example: "123e4567-e89b-12d3-a456-426614174000"
	})
	@IsNotEmpty()
	@IsString({ message: "Product variant ID must be a string" })
	variantId: string
}
