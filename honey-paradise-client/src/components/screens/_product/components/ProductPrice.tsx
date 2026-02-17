import { HeartIcon, InfoIcon } from "lucide-react"
import dynamic from "next/dynamic"
import type { FC } from "react"

import { Button, Skeleton } from "@/components/ui/common"
import { CartCounter } from "@/components/ui/components/cart-counter/CartCounter"
import { useProductContext } from "@/shared/lib/hooks/context"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"
import { cn } from "@/shared/lib/utils/base"
import type {
	GetProductBySlugResponseDiscount,
	GetProductBySlugResponseVariant
} from "@/shared/types/server"

const DynamicProductDiscountDM = dynamic(
	() => import("./ProductDiscountDM").then(mod => mod.ProductDiscountDM),
	{ ssr: false }
)

interface IProps {
	discounts: GetProductBySlugResponseDiscount[]
	variants: GetProductBySlugResponseVariant[]
	totalDiscount: number
	isProductLoading: boolean
}

const ProductPrice: FC<IProps> = ({
	discounts,
	variants,
	totalDiscount,
	isProductLoading
}) => {
	const {
		variantId,
		cartId,
		currency,
		isLiked,
		loading,
		handleSwitchFavorite,
		handleAddToCart
	} = useProductContext()

	const { getPrice } = useGetPrice(currency)

	const currentIndex = variants.findIndex(i => i.id === variantId) || 0
	const price = variants[currentIndex]?.priceInUsd || 0

	const totalPrice = price - price * totalDiscount
	const getDiscountPrice = (price: number) => getPrice(price, true, true)

	return (
		<div className="flex items-center gap-3">
			<div className="flex w-full items-center justify-between rounded-lg bg-primary/40 px-4 py-2 shadow-sm">
				<div>
					{loading.default ? (
						<Skeleton className="mb-2 h-6 w-24" />
					) : (
						<p className="text-lg">{getPrice(totalPrice, true, true)}</p>
					)}

					{totalDiscount > 0 &&
						(loading.default ? (
							<Skeleton className="h-5 w-20" />
						) : (
							<p className="text-muted line-through">
								{getPrice(price, true, false)}
							</p>
						))}
				</div>

				<DynamicProductDiscountDM
					discounts={discounts}
					priceInUsd={price}
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
				disabled={loading.default || loading.favorite}
				onClick={handleSwitchFavorite}
			>
				<HeartIcon
					size={24}
					className={cn("animate-show-effect opacity-0", {
						"fill-red-500": isLiked
					})}
				/>
			</Button>

			{!!cartId ? (
				<CartCounter
					id={cartId}
					className="rounded-md bg-primary/40 [&_>_button]:bg-transparent"
				/>
			) : (
				<Button
					variant="default"
					title={"Добавить в корзину"}
					className="!p-3"
					isLoading={loading.cart || loading.default || isProductLoading}
					onClick={handleAddToCart}
				>
					{"В корзину"}
				</Button>
			)}
		</div>
	)
}

export { ProductPrice }
