import { Button } from "@/components/ui/common";
import { cn } from "@/shared/lib/utils/base";
import { HeartIcon } from "lucide-react";
import type { FC } from "react";
import { useProductCardFooter } from "../../hooks/useProductCard";

interface IProps {
	id: string;
	isLiked: boolean;
}

const ProductCardFooter: FC<IProps> = ({ id, isLiked: isLikedServer }) => {
	const { isAddingCartItem, isSwitchingFavoritesProduct, isAuthenticated, t, addToCart, switchFavorites, isLiked } =
		useProductCardFooter(isLikedServer);

	return (
		<div className="flex items-center gap-3">
			<Button
				variant="secondary"
				title={t("products.labels.addToCart")}
				className="py-2 w-full"
				isLoading={isAddingCartItem}
				disabled={isAddingCartItem || !isAuthenticated}
				onClick={() => addToCart(id)}
			>
				{t("products.addToCart")}
			</Button>
			{isAuthenticated && (
				<Button
					variant="ghost"
					title={t("products.labels.like", { isLiked: String(isLiked) })}
					onClick={() => switchFavorites(id)}
					disabled={isSwitchingFavoritesProduct}
					className={cn("relative p-1 [&_>_svg]:hover:fill-red-500", { "[&_>_div]:hover:w-10": isLiked })}
				>
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 bg-red-500 -rotate-45 w-0 transition-all" />
					<HeartIcon
						size={24}
						className={cn("stroke-red-500 fill-transparent transition-colors will-change-auto", {
							"!fill-red-500": isLiked,
						})}
					/>
				</Button>
			)}
		</div>
	);
};

export { ProductCardFooter };
