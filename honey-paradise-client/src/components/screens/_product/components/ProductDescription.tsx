import { Button, Separator, Skeleton } from "@/components/ui/common";

import { cn } from "@/shared/lib/utils/base";
import { HeartIcon } from "lucide-react";
import { m } from "motion/react";
import type { FC } from "react";
import { useProductDescription } from "../hooks/useProductDescription";
import type { IProductDescriptionProps } from "../types/product-description.type";

const ProductDescription: FC<IProductDescriptionProps> = ({ currency, isLiked, isProductLoading, isAccLoading, data }) => {
	const { t, descData, handleSwitchFavorite, handleAddToCart, getPrice, isInCart, isSwitchingFavoritesProduct, loading } =
		useProductDescription(data, currency);

	const { priceInUsd } = data;

	return (
		<section className="flex flex-col gap-2 p-6 bg-secondary">
			{descData.map(({ name, value }, i) => (
				<m.p
					key={name}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, type: "tween", delay: 0.3 * i }}
					className={i === 2 || i === 3 ? "inline-flex items-center" : ""}
				>
					<span className="text-muted">{name}:</span>&nbsp;
					{value}
				</m.p>
			))}

			<Separator orientation="horizontal" className="w-full h-px my-3" />

			<div className="flex items-center gap-3">
				<div className="w-full bg-primary/40 px-4 py-2 rounded-lg shadow-sm">
					{isAccLoading ? <Skeleton className="w-24 h-6 mb-2" /> : <p className="text-lg">{getPrice(priceInUsd, true, false)}</p>}

					{isAccLoading ? (
						<Skeleton className="w-20 h-5" />
					) : (
						<p className="text-muted line-through">{getPrice(priceInUsd * 0.85, true, false)}</p>
					)}
				</div>

				<Button
					variant="default"
					title="Switch favorite"
					className="p-3 !bg-primary/40 !text-red-500"
					isLoading={isAccLoading || isSwitchingFavoritesProduct}
					onClick={handleSwitchFavorite}
				>
					<HeartIcon size={24} className={cn("opacity-0 animate-show-effect", { "fill-red-500": isLiked })} />
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
