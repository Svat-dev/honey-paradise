import { HeartCrackIcon, ShoppingCartIcon } from "lucide-react"
import { m } from "motion/react"
import type { FC } from "react"

import { Button, Title } from "@/components/ui/common"
import { ProductCardImages } from "@/components/ui/components/ProductCardImages"
import type {
	ApiJsonValue,
	GetShortProductsResponse
} from "@/shared/types/server"

import { useFavoritesProductCard } from "../hooks/useFavoritesProductCard"

interface IProps extends GetShortProductsResponse {
	price: string
}

const FavoriteProductCard: FC<IProps> = ({
	images,
	slug,
	title,
	price,
	id,
	priceInUsd
}) => {
	const {
		handleAddToCart,
		handleDeleteFavorite,
		isSwitchingFavoritesProduct,
		loading,
		locale,
		t
	} = useFavoritesProductCard(id, priceInUsd)

	const _title = title[locale as keyof ApiJsonValue]

	return (
		<m.article
			initial={{ opacity: 0.3, y: -10 }}
			animate={"default"}
			exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
			variants={{ default: { opacity: 1, y: 0 } }}
			whileInView={"default"}
			viewport={{ once: true, amount: 0.5 }}
			transition={{ duration: 0.4, type: "tween" }}
			className="grid grid-cols-[auto_1fr_min-content] items-center gap-5 overflow-hidden rounded-md bg-primary p-3"
		>
			<ProductCardImages
				images={images}
				slug={slug}
				width={160}
				height={112}
				className="h-28 w-40 rounded-md border border-muted"
			/>

			<div>
				<Title size="sm" className="text-[22px]">
					{_title}
				</Title>
				<p>{price}</p>
			</div>

			<div className="flex flex-col gap-2">
				<Button
					variant="secondary"
					title={t("labels.addToCart")}
					className="p-2"
					isLoading={loading.add}
					onClick={handleAddToCart}
				>
					<ShoppingCartIcon size={24} />
				</Button>

				<Button
					variant="destructive-outline"
					title={t("labels.delete")}
					className="p-2 text-red-500"
					isLoading={isSwitchingFavoritesProduct}
					onClick={handleDeleteFavorite}
				>
					<HeartCrackIcon size={24} />
				</Button>
			</div>
		</m.article>
	)
}

export { FavoriteProductCard }
