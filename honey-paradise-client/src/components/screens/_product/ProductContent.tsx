"use client"

import { useQuery } from "@tanstack/react-query"
import type { FC } from "react"

import { productsService } from "@/services/products.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { GetProductBySlugResponse } from "@/shared/types/server"

import { ProductReviewsWrapper } from "./components/product-review/ProductReviewsWrapper"
import { ProductDescription } from "./components/ProductDescription"
import { ProductImage } from "./components/ProductImage"
import { ProductShareDM } from "./components/ProductShareDM"
import { useProduct } from "./hooks/useProduct"
import type { IProductDescriptionPropsData } from "./types/product-description.type"

interface IProductContent {
	initialData: GetProductBySlugResponse
	slug: string
}

const ProductContent: FC<IProductContent> = ({ initialData, slug }) => {
	const { data, isLoading: isProductLoading } = useQuery({
		queryKey: [queryKeys.getProductPage, slug],
		queryFn: () => productsService.getBySlug(slug),
		initialData
	})

	const { user, isAccLoading } = useProduct(data.id)

	const props: IProductDescriptionPropsData = {
		id: data?.id,
		description: data?.description,
		priceInUsd: data?.priceInUsd,
		discounts: data?.discounts,
		rating: data?.rating,
		category: data?.category,
		reviews: data?._count?.reviews || 0,
		isLiked: data?.isLiked || false
	}

	return (
		<>
			<article className="relative mb-3 grid h-fit grid-cols-2 overflow-hidden rounded-md bg-primary">
				<ProductImage
					isLoading={isProductLoading || isAccLoading}
					images={data.images}
				/>

				<ProductShareDM slug={slug} isLoading={isAccLoading} />

				<ProductDescription
					data={props}
					currency={user?.settings.defaultCurrency}
					isAccLoading={isAccLoading}
					isProductLoading={isProductLoading}
				/>
			</article>

			<ProductReviewsWrapper
				productId={data.id}
				slug={data.slug}
				reviewsLength={data._count.reviews || 0}
			/>
		</>
	)
}

export { ProductContent }
