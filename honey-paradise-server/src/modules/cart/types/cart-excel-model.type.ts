import type { JsonValue } from "@prisma/client/runtime/library"

export interface CartExcelModelResponse {
	id: string
	totalPrice: number
	user: { username: string }
	cartItems: CartItemExcelModel[]
	_count: { cartItems: number }
}

interface CartItemExcelModel {
	id: string
	quantity: number
	priceInUSD: number
	weight: number
	productVariant: ProductVariantExcelModel
}

interface ProductVariantExcelModel {
	art: number
	product: ProductExcelModel
}

interface ProductExcelModel {
	title: JsonValue
	slug: string
	category: CategoryExcelModel
}

interface CategoryExcelModel {
	title: JsonValue
	slug: string
}
