"use client";

import { useGetAllCatsWithProdS } from "@/services/hooks/products";
import { CategorySection } from "./components/CategorySection";

interface IProps {
	q: string | string[] | undefined;
}

const Catalog = ({ q }: IProps) => {
	const { catsWithProducts, isCatsWithProductsLoading } = useGetAllCatsWithProdS();

	return (
		<div className="flex flex-col w-full">
			{q?.length && (
				<p>
					По запросу <span className="font-medium">"{q}"</span> найдено{" "}
					<span className="font-medium">{catsWithProducts?.allProductsLength} </span>продуктов в{" "}
					<span className="font-medium">{catsWithProducts?.categoriesLength}</span> категориях
				</p>
			)}

			{isCatsWithProductsLoading ? (
				<p>Loading...</p>
			) : (
				catsWithProducts?.categories.map(item => <CategorySection key={item.id} {...item} />)
			)}
		</div>
	);
};

export { Catalog };
