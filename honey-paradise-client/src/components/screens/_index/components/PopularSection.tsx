"use client"

import { AnimatePresence } from "motion/react"

import { Title } from "@/components/ui/common"
import { useGetPopularProductsS } from "@/services/hooks/products/useGetPopularProductsS"

import { ProductCard } from "../../_catalog/components/product-card/ProductCard"
import { ProductCardLoading } from "../../_catalog/components/product-card/ProductCardLoading"

const PopularSection = () => {
	const { popularProducts, isPopularProductsLoading } = useGetPopularProductsS()

	return (
		<section className="mx-8 mt-4">
			<Title size="lg" className="mb-2 font-semibold">
				Популярные товары
			</Title>

			<div className="flex gap-5 overflow-x-auto">
				<AnimatePresence mode="wait">
					{isPopularProductsLoading
						? new Array(3).fill(0).map((_, i) => <ProductCardLoading key={i} />)
						: popularProducts?.map(item => (
								<ProductCard key={item.id} {...item} />
							))}
				</AnimatePresence>
			</div>
		</section>
	)
}

export { PopularSection }
