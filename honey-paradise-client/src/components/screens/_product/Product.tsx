"use client";

import type { ApiJsonValue, GetProductBySlugResponse } from "@/shared/types/server";

import { Title } from "@/components/ui/common";
import { productsService } from "@/services/products.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { ProductReviewsWrapper } from "./components/product-review/ProductReviewsWrapper";
import { ProductDescription } from "./components/ProductDescription";
import { ProductImage } from "./components/ProductImage";
import { ProductShareDM } from "./components/ProductShareDM";
import { useProduct } from "./hooks/useProduct";
import type { IProductDescriptionPropsData } from "./types/product-description.type";

interface IProduct {
	initialData: GetProductBySlugResponse;
	slug: string;
	locale: string;
}

const Product: FC<IProduct> = ({ initialData, slug }) => {
	const { data, isLoading: isProductLoading } = useQuery({
		queryKey: [queryKeys.getProductPage, slug],
		queryFn: () => productsService.getBySlug(slug),
		initialData,
	});

	const { user, isAccLoading, locale, isLikedServer } = useProduct(data.id);

	const props: IProductDescriptionPropsData = {
		id: data?.id,
		description: data?.description,
		priceInUsd: data?.priceInUsd,
		rating: data?.rating,
		category: data?.category,
		reviews: data?._count?.reviews || 0,
	};

	return (
		<article className="px-10 py-5">
			<Title size="lg" className="text-3xl mb-3 font-semibold">
				{data?.title?.[locale as keyof ApiJsonValue]}
			</Title>

			<article className="relative grid grid-cols-2 h-fit bg-primary rounded-md overflow-hidden mb-3">
				<ProductImage isLoading={isProductLoading || isAccLoading} images={data.images} />

				<ProductShareDM slug={slug} isLoading={isAccLoading} />

				<ProductDescription
					data={props}
					currency={user?.settings.defaultCurrency}
					isAccLoading={isAccLoading}
					isProductLoading={isProductLoading}
					isLiked={!!isLikedServer}
				/>
			</article>

			<ProductReviewsWrapper productId={data.id} slug={data.slug} reviewsLength={data._count.reviews || 0} />
		</article>
	);
};

export { Product };
