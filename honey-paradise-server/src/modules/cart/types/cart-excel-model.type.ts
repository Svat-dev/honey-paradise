import type { JsonValue } from "@prisma/client/runtime/library"

export interface CartExcelModelResponse {
	id: string
	totalPrice: number
	username: string
	cartItems: CartItemExcelModel[]
	length: number
}

interface CartItemExcelModel {
	id: string
	quantity: number
	priceInUSD: number
	weight: number
	product: ProductExcelModel
}

interface ProductExcelModel {
	title: JsonValue
	slug: string
	category: CategoryExcelModel
	description: JsonValue
}

interface CategoryExcelModel {
	title: JsonValue
	slug: string
}
