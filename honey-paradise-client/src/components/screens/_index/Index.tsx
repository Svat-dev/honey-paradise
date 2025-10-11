"use client";

import { CategorySection } from "./components/CategorySection";
import { useGetAllCatsWithProdS } from "@/services/hooks/products";

const Index = () => {
	const { catsWithProducts, isCatsWithProductsLoading } = useGetAllCatsWithProdS();

	return (
		<div className="tw-flex tw-flex-col tw-w-full">
			{isCatsWithProductsLoading ? <p>Loading...</p> : catsWithProducts?.map(item => <CategorySection key={item.id} {...item} />)}
		</div>
	);
};

export { Index };
