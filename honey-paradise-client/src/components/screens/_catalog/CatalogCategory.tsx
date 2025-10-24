"use client";

import { CategorySection } from "./components/CategorySection";
import type { FC } from "react";
import { productsService } from "@/services/products.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useQuery } from "@tanstack/react-query";

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
			{isLoading ? <p>Loading...</p> : data?.data ? <CategorySection {...data.data} /> : "404 Not found"}
		</div>
	);
};

export { CatalogCategory };
