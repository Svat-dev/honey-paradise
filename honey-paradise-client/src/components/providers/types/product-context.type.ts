import type {
	GetMyCartResponseCurrency,
	GetProductBySlugResponseIsLiked
} from "@/shared/types/server"

export type TProductContext = {
	currency: GetMyCartResponseCurrency | undefined
	isLiked: boolean | null
	loading: ILoading
} & Omit<IProductContextValues, "isLiked"> &
	IActions

export interface IProductContextValues {
	variantId: string
	isLiked: GetProductBySlugResponseIsLiked | null
	cartId: string | null
}

interface ILoading {
	default: boolean
	cart: boolean
	favorite: boolean
}

interface IActions {
	handleSwitchFavorite: () => Promise<void>
	handleAddToCart: () => void
	setVariantId: (id: string, article: number) => void
}
