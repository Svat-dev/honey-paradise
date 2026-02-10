"use client"

import { useQuery } from "@tanstack/react-query"
import { AnimatePresence } from "motion/react"
import type { FC } from "react"

import { ProductCard } from "@/components/screens/_catalog/components/product-card/ProductCard"
import { ProductCardLoading } from "@/components/screens/_catalog/components/product-card/ProductCardLoading"
import { productsService } from "@/services/products.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { GetProductResponse } from "@/shared/types/server"

interface IProps {
	initialData: GetProductResponse[]
}

const PopularSectionContent: FC<IProps> = ({ initialData }) => {
	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.getPopularProducts],
		queryFn: () => productsService.getPopular(),
		initialData,
		enabled: !!initialData
	})

	return (
		<div className="flex gap-5 overflow-x-auto overflow-y-hidden">
			<AnimatePresence mode="wait">
				{isFetching
					? new Array(3).fill(0).map((_, i) => <ProductCardLoading key={i} />)
					: data.map(item => <ProductCard key={item.id} {...item} />)}
			</AnimatePresence>
		</div>
	)
}

export { PopularSectionContent }
