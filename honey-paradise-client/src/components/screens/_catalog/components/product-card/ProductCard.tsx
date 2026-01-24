import type { ApiJsonValue, GetProductResponse } from "@/shared/types/server"
import type { FC, PropsWithChildren } from "react"

import { StarIcon } from 'lucide-react';
import { m } from 'motion/react';

import { Title } from '@/components/ui/common';
import { ProductCardImages } from '@/components/ui/components/ProductCardImages';

import { useProductCard } from '../../hooks/useProductCard';
import { ProductCardFooter } from './ProductCardFooter';

interface IProps extends GetProductResponse, PropsWithChildren {}

const ProductCard: FC<IProps> = ({
	id,
	_count,
	description,
	priceInUsd,
	totalDiscount,
	rating,
	title,
	images,
	slug,
	isLiked,
	children
}) => {
	const { getPrice, totalPrice, locale, t } = useProductCard(priceInUsd, totalDiscount)

	return (
		<m.article
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="relative grid rounded-md bg-primary p-5 pt-4 w-[350px]"
		>
			<ProductCardImages images={images} slug={slug} className="h-52 mb-1" />

			<Title size="md" className="mb-1 font-medium">
				{title[locale as keyof ApiJsonValue]}
			</Title>

			{description && <p className="text-muted mb-4">{description[locale as keyof ApiJsonValue]}</p>}

			{totalDiscount > 0 && (
				<span className="absolute z-10 top-4 right-5 bg-secondary px-1 py-0.5 rounded-lg shadow-md select-none">
					-{totalDiscount * 100}%
				</span>
			)}

			<div className="flex items-center gap-3 mb-3 text-muted">
				<span className="inline-flex items-center">
					<StarIcon size={24} className="mr-1" />
					{rating}
				</span>
				<span>{t("products.comments", { count: _count.reviews || 0 })}</span>
			</div>

			<div className="flex items-center mb-3">
				<span className="mr-3 text-lg">{getPrice(totalPrice, true, true)}</span>
				{totalDiscount > 0 && <span className="pt-1 line-through text-base text-muted">{getPrice(priceInUsd, true, false)}</span>}
			</div>

			{children && <>{children}</>}

			<ProductCardFooter id={id} isLiked={isLiked} />
		</m.article>
	)
}

export { ProductCard }
