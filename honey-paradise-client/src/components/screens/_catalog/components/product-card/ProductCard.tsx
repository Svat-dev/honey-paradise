import { StarIcon } from "lucide-react"
import { m } from "motion/react"
import type { FC, PropsWithChildren } from "react"

import { Title } from "@/components/ui/common"
import { ProductCardImages } from "@/components/ui/components/ProductCardImages"
import type { ApiJsonValue, GetProductResponse } from "@/shared/types/server"

import { useProductCard } from "../../hooks/useProductCard"

import { ProductCardFooter } from "./ProductCardFooter"

interface IProps extends GetProductResponse, PropsWithChildren {}

const ProductCard: FC<IProps> = ({
	id,
	_count,
	priceInUsd,
	totalDiscount,
	rating,
	title,
	images,
	slug,
	isLiked,
	children
}) => {
	const { getPrice, totalPrice, locale, t } = useProductCard(
		priceInUsd,
		totalDiscount
	)

	return (
		<m.article
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="relative grid w-[350px] rounded-md bg-primary p-5 pt-4"
		>
			<ProductCardImages images={images} slug={slug} className="mb-1 h-52" />

			<Title size="md" className="mb-1 font-medium">
				{title[locale as keyof ApiJsonValue]}
			</Title>

			{totalDiscount > 0 && (
				<span className="absolute right-5 top-4 z-10 select-none rounded-lg bg-secondary px-1 py-0.5 shadow-md">
					-{totalDiscount * 100}%
				</span>
			)}

			<div className="mb-3 flex items-center gap-3 text-muted">
				<span className="inline-flex items-center">
					<StarIcon size={24} className="mr-1" />
					{rating}
				</span>
				<span>{t("products.comments", { count: _count.reviews || 0 })}</span>
			</div>

			<div className="mb-3 flex items-center">
				<span className="mr-3 text-lg">{getPrice(totalPrice, true, true)}</span>
				{totalDiscount > 0 && (
					<span className="pt-1 text-base text-muted line-through">
						{getPrice(priceInUsd, true, false)}
					</span>
				)}
			</div>

			{children && <>{children}</>}

			<ProductCardFooter id={id} isLiked={isLiked} />
		</m.article>
	)
}

export { ProductCard }
