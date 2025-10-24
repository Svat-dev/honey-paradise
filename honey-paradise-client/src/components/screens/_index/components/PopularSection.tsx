"use client";

import { useGetPopularProductsS } from "@/services/hooks/products/useGetPopularProductsS";

const PopularSection = () => {
	const { popularProducts, isPopularProductsLoading } = useGetPopularProductsS();

	return (
		<section>
			<p>Now popular</p>
			{isPopularProductsLoading ? <p>Loading...</p> : <span>{popularProducts?.length} product(s)</span>}
		</section>
	);
};

export { PopularSection };
