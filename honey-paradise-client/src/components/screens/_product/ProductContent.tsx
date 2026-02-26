"use client"

import type { FC } from "react"

import { ProductContextProvider } from "@/components/providers/ProductPageContext"
import { Separator } from "@/components/ui/common"
import type { GetProductBySlugResponse } from "@/shared/types/server"

import { ProductReviewsWrapper } from "./components/product-review/ProductReviewsWrapper"
import { ProductDescriptionText } from "./components/ProductDescriptionText"
import { ProductImage } from "./components/ProductImage"
import { ProductPrice } from "./components/ProductPrice"
import { ProductShareDM } from "./components/ProductShareDM"
import { ProductVariants } from "./components/ProductVariants"
import { useProduct } from "./hooks/useProduct"

interface IProductContent {
	initialData: GetProductBySlugResponse
	currentArticle: number
	locale: string
	slug: string
}

const ProductContent: FC<IProductContent> = ({
	initialData,
	currentArticle,
	locale,
	slug
}) => {
	const { data, totalDiscount, variantId, isProductLoading } = useProduct(
		initialData,
		currentArticle,
		slug
	)

	return (
		<>
			<article className="relative mb-3 grid h-fit grid-cols-2 overflow-hidden rounded-md bg-primary">
				<ProductContextProvider
					id={data.id}
					variantId={variantId || ""}
					isLikedServer={data.isLiked}
				>
					<ProductImage isLoading={isProductLoading} images={data.images} />

					<ProductShareDM slug={slug} art={currentArticle} />

					<section className="flex flex-col gap-2 bg-secondary p-6">
						<ProductDescriptionText
							description={data.description}
							rating={data.rating}
							reviews={data._count.reviews || 0}
							category={data.category}
							locale={locale}
						/>

						<Separator orientation="horizontal" className="my-3 h-px w-full" />

						<ProductVariants variants={data.variants} />

						<Separator orientation="horizontal" className="my-3 h-px w-full" />

						<ProductPrice
							discounts={data.discounts}
							variants={data.variants}
							totalDiscount={totalDiscount}
							isProductLoading={isProductLoading}
						/>
					</section>
				</ProductContextProvider>
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
