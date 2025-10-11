import type { FC } from "react";
import type { GetCatsWithProductsResponse } from "@/shared/types/server";
import { ProductCard } from "./ProductCard";
import { Title } from "@/components/ui/common";

interface IProps extends GetCatsWithProductsResponse {}

const CategorySection: FC<IProps> = ({ title, slug, products }) => {
	return (
		<section className="tw-py-3 tw-px-6">
			<Title id={slug} size="lg" className="tw-font-semibold tw-mb-2">
				{title["ru"]}
			</Title>

			<div className="tw-flex tw-gap-x-10 tw-gap-y-3 tw-flex-wrap">
				{products.map(product => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
		</section>
	);
};

export { CategorySection };
