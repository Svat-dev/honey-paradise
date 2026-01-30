"use client"

import { Trash2Icon } from "lucide-react"
import { AnimatePresence } from "motion/react"

import { ProductCard } from "@/components/screens/_catalog/components/product-card/ProductCard"
import { ProductCardLoading } from "@/components/screens/_catalog/components/product-card/ProductCardLoading"
import { Button } from "@/components/ui/common"

import { useRecentSection } from "../../hooks/useRecentSection"

const RecentSectionContent = () => {
	const { history, products, isHistoryLoading, removeFromHistory } =
		useRecentSection()

	if (history.length === 0 && !isHistoryLoading) return

	return (
		<div className="flex gap-5 overflow-x-auto overflow-y-hidden">
			<AnimatePresence mode="wait">
				{isHistoryLoading
					? new Array(3).fill(0).map((_, i) => <ProductCardLoading key={i} />)
					: products?.map(item => (
							<ProductCard key={item.id} {...item}>
								<Button
									variant="outline"
									title="Удалить из истории"
									className="!absolute left-5 top-4 z-10 !bg-muted/30 !p-2 hover:rounded-3xl hover:border-red-500 hover:text-red-500 active:scale-90"
									onClick={() => removeFromHistory(item.id)}
								>
									<Trash2Icon
										size={24}
										className="transition-colors will-change-auto"
									/>
								</Button>
							</ProductCard>
						))}
			</AnimatePresence>
		</div>
	)
}

export { RecentSectionContent }
