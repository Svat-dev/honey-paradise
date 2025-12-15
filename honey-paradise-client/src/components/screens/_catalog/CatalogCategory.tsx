"use client";

import { productsService } from "@/services/products.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import type { FC } from "react";
import { CategoryLoading } from "./components/CategoryLoading";
import { CategorySection } from "./components/CategorySection";

interface IProps {
	slug: string;
}

const CatalogCategory: FC<IProps> = ({ slug }) => {
	const { data, isLoading } = useQuery({
		queryKey: [queryKeys.getProductsByCategory, slug],
		queryFn: () => productsService.getByCatSlug(slug),
		enabled: !!slug,
	});

	return (
		<div className="flex flex-col w-full">
			<AnimatePresence mode="wait">
				{isLoading ? <CategoryLoading /> : data?.data ? <CategorySection {...data.data} /> : "404 Not found"}
			</AnimatePresence>
		</div>
	);
};

export { CatalogCategory };
