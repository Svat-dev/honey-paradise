import type { GetMyCartResponseCurrency } from "@/shared/types/server"

export type TProductContext = {
	currency: GetMyCartResponseCurrency | undefined
	loading: ILoading
} & IProductContextValues &
	IActions

export interface IProductContextValues {
	variantId: string
	isLiked: boolean | null
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
