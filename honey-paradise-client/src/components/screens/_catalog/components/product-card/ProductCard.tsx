import type { ApiJsonValue, GetProductResponse } from "@/shared/types/server";
import type { FC, PropsWithChildren } from "react";

import { Title } from "@/components/ui/common";
import { ProductCardImages } from "@/components/ui/components/ProductCardImages";
import { StarIcon } from "lucide-react";
import { m } from "motion/react";
import { useProductCard } from "../../hooks/useProductCard";
import { ProductCardFooter } from "./ProductCardFooter";

interface IProps extends GetProductResponse, PropsWithChildren {}

const ProductCard: FC<IProps> = ({ id, _count, description, priceInUsd, rating, title, images, slug, children }) => {
	const { getPrice, oldPrice, locale, likedProducts, t } = useProductCard(priceInUsd);

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

			<div className="flex items-center gap-3 mb-3 text-muted">
				<span className="inline-flex items-center">
					<StarIcon size={24} className="mr-1" />
					{rating}
				</span>
				<span>{t("products.comments", { count: _count.reviews || 0 })}</span>
			</div>

			<div className="flex items-center mb-3">
				<span className="mr-3 text-lg">{getPrice(priceInUsd, true, false)}</span>
				<span className="pt-1 line-through text-base text-muted">{getPrice(oldPrice, true, true)}</span>
			</div>

			{children && <>{children}</>}

			<ProductCardFooter id={id} priceInUsd={priceInUsd} isLiked={!!likedProducts?.includes(id)} />
		</m.article>
	);
};

export { ProductCard };
