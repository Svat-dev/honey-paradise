import { Button, Separator, Skeleton } from "@/components/ui/common";
import { HeartIcon, InfoIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/base";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useProductDescription } from "../hooks/useProductDescription";
import type { IProductDescriptionProps } from "../types/product-description.type";
import { ProductDescriptionText } from "./ProductDescriptionText";

const DynamicProductDiscountDM = dynamic(() => import("./ProductDiscountDM").then(mod => mod.ProductDiscountDM), { ssr: false });

const ProductDescription: FC<IProductDescriptionProps> = ({ currency, isProductLoading, isAccLoading, data }) => {
	const { id, description, priceInUsd, discounts, rating, reviews, category } = data;

	const { t, handleSwitchFavorite, handleAddToCart, getPrice, isLiked, isInCart, isSwitchingFavoritesProduct, loading, locale } =
		useProductDescription(id, data.isLiked, currency);

	const totalDiscount = discounts.reduce((acc, curr) => acc + curr.discount, 0);
	const totalPrice = priceInUsd - priceInUsd * totalDiscount;
	const getDiscountPrice = (price: number) => getPrice(price, true, true);

	return (
		<section className="flex flex-col gap-2 p-6 bg-secondary">
			<ProductDescriptionText description={description} rating={rating} reviews={reviews} category={category} locale={locale} />

			<Separator orientation="horizontal" className="w-full h-px my-3" />

			<div className="flex items-center gap-3">
				<div className="flex items-center justify-between w-full bg-primary/40 px-4 py-2 rounded-lg shadow-sm">
					<div>
						{isAccLoading ? <Skeleton className="w-24 h-6 mb-2" /> : <p className="text-lg">{getPrice(totalPrice, true, true)}</p>}

						{totalDiscount > 0 &&
							(isAccLoading ? (
								<Skeleton className="w-20 h-5" />
							) : (
								<p className="text-muted line-through">{getPrice(priceInUsd, true, false)}</p>
							))}
					</div>

					<DynamicProductDiscountDM discounts={discounts} priceInUsd={priceInUsd} totalPrice={totalPrice} getPrice={getDiscountPrice}>
						<Button variant="ghost" className="text-muted hover:text-black opacity-0 animate-show-effect">
							<InfoIcon size={24} />
						</Button>
					</DynamicProductDiscountDM>
				</div>

				<Button
					variant="default"
					title="Switch favorite"
					className="p-3 !bg-primary/40 !text-red-500"
					disabled={isAccLoading || isSwitchingFavoritesProduct}
					onClick={handleSwitchFavorite}
				>
					<HeartIcon
						size={24}
						className={cn("opacity-0 animate-show-effect", { "fill-red-500": isLiked === null ? data.isLiked : isLiked })}
					/>
				</Button>

				<Button
					variant={isInCart ? "outline" : "default"}
					title={"Добавить в корзину"}
					className={cn("!p-3", { "!bg-primary/40": !isInCart })}
					isLoading={loading.add}
					disabled={isAccLoading || isProductLoading}
					onClick={handleAddToCart}
				>
					{isInCart ? "В корзине" : "В корзину"}
				</Button>
			</div>
		</section>
	);
};

export { ProductDescription };
