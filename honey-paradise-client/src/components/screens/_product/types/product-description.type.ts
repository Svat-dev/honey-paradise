import type { ApiJsonValue, GetMyCartResponseCurrency, GetProductBySlugResponseCategory } from "@/shared/types/server";

export interface IProductDescriptionPropsData {
	id: string;
	description: ApiJsonValue;
	priceInUsd: number;
	rating: number;
	category: GetProductBySlugResponseCategory;
	reviews: number;
}

export interface IProductDescriptionProps {
	data: IProductDescriptionPropsData;
	currency: GetMyCartResponseCurrency | undefined;
	isAccLoading: boolean;
	isProductLoading: boolean;
	isLiked: boolean;
}
