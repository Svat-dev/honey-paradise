"use client";

import { Button, Title } from "@/components/ui/common";

import { Trash2Icon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { ProductCard } from "../../_catalog/components/product-card/ProductCard";
import { ProductCardLoading } from "../../_catalog/components/product-card/ProductCardLoading";
import { useRecentSection } from "../hooks/useRecentSection";

const RecentSection = () => {
	const { history, products, isHistoryLoading, removeFromHistory } = useRecentSection();

	if (history.length === 0 && !isHistoryLoading) return;

	return (
		<section className="mx-8 mt-4">
			<Title size="lg" className="font-semibold mb-2">
				Недавно смотрели
			</Title>

			<div className="flex gap-5 overflow-x-auto">
				<AnimatePresence mode="wait">
					{isHistoryLoading
						? new Array(3).fill(0).map((_, i) => <ProductCardLoading key={i} />)
						: products?.map(item => (
								<ProductCard key={item.id} {...item}>
									<Button
										variant="outline"
										title="Удалить из истории"
										className="!absolute z-10 top-4 left-5 !p-2 !bg-muted/30 hover:rounded-3xl hover:border-red-500 hover:text-red-500 active:scale-90"
										onClick={() => removeFromHistory(item.id)}
									>
										<Trash2Icon size={24} className="transition-colors will-change-auto" />
									</Button>
								</ProductCard>
						  ))}
				</AnimatePresence>
			</div>
		</section>
	);
};

export { RecentSection };
