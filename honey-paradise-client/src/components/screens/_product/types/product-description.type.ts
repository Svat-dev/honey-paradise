import type {
	ApiJsonValue,
	GetMyCartResponseCurrency,
	GetProductBySlugResponseCategory,
	GetProductBySlugResponseDiscount
} from "@/shared/types/server"

export interface IProductDescriptionPropsData {
	id: string
	description: ApiJsonValue
	priceInUsd: number
	discounts: GetProductBySlugResponseDiscount[]
	rating: number
	category: GetProductBySlugResponseCategory
	reviews: number
	isLiked: boolean
}

export interface IProductDescriptionProps {
	data: IProductDescriptionPropsData
	currency: GetMyCartResponseCurrency | undefined
	isAccLoading: boolean
	isProductLoading: boolean
}
