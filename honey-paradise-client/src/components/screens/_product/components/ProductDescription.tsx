import { HeartIcon, InfoIcon } from "lucide-react"
import dynamic from "next/dynamic"
import type { FC } from "react"

import { Button, Separator, Skeleton } from "@/components/ui/common"
import { cn } from "@/shared/lib/utils/base"

import { useProductDescription } from "../hooks/useProductDescription"
import type { IProductDescriptionProps } from "../types/product-description.type"

import { ProductDescriptionText } from "./ProductDescriptionText"

const DynamicProductDiscountDM = dynamic(
	() => import("./ProductDiscountDM").then(mod => mod.ProductDiscountDM),
	{ ssr: false }
)

const ProductDescription: FC<IProductDescriptionProps> = ({
	currency,
	isProductLoading,
	isAccLoading,
	data
}) => {
	const { id, description, priceInUsd, discounts, rating, reviews, category } =
		data

	const {
		t,
		handleSwitchFavorite,
		handleAddToCart,
		getPrice,
		isLiked,
		isInCart,
		isSwitchingFavoritesProduct,
		loading,
		locale
	} = useProductDescription(id, data.isLiked, currency)

	const totalDiscount = discounts.reduce((acc, curr) => acc + curr.discount, 0)
	const totalPrice = priceInUsd - priceInUsd * totalDiscount
	const getDiscountPrice = (price: number) => getPrice(price, true, true)

	return (
		<section className="flex flex-col gap-2 bg-secondary p-6">
			<ProductDescriptionText
				description={description}
				rating={rating}
				reviews={reviews}
				category={category}
				locale={locale}
			/>

			<Separator orientation="horizontal" className="my-3 h-px w-full" />

			<div className="flex items-center gap-3">
				<div className="flex w-full items-center justify-between rounded-lg bg-primary/40 px-4 py-2 shadow-sm">
					<div>
						{isAccLoading ? (
							<Skeleton className="mb-2 h-6 w-24" />
						) : (
							<p className="text-lg">{getPrice(totalPrice, true, true)}</p>
						)}

						{totalDiscount > 0 &&
							(isAccLoading ? (
								<Skeleton className="h-5 w-20" />
							) : (
								<p className="text-muted line-through">
									{getPrice(priceInUsd, true, false)}
								</p>
							))}
					</div>

					<DynamicProductDiscountDM
						discounts={discounts}
						priceInUsd={priceInUsd}
						totalPrice={totalPrice}
						getPrice={getDiscountPrice}
					>
						<Button
							variant="ghost"
							className="animate-show-effect text-muted opacity-0 hover:text-black"
						>
							<InfoIcon size={24} />
						</Button>
					</DynamicProductDiscountDM>
				</div>

				<Button
					variant="default"
					title="Switch favorite"
					className="!bg-primary/40 p-3 !text-red-500"
					disabled={isAccLoading || isSwitchingFavoritesProduct}
					onClick={handleSwitchFavorite}
				>
					<HeartIcon
						size={24}
						className={cn("animate-show-effect opacity-0", {
							"fill-red-500": isLiked === null ? data.isLiked : isLiked
						})}
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
	)
}

export { ProductDescription }
