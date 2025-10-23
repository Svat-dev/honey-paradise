import type { ApiJsonValue, GetAllCatsResponse } from "@/shared/types/server";

import { Title } from "@/components/ui/common";
import { useLanguage } from "@i18n/hooks";
import type { FC } from "react";
import { ProductCard } from "./product-card/ProductCard";

interface IProps extends GetAllCatsResponse {}

const CategorySection: FC<IProps> = ({ title, slug, products }) => {
	const { locale } = useLanguage();

	return (
		<section className="py-3 px-6">
			<Title id={slug} size="lg" className="font-semibold mb-2">
				{title[locale as keyof ApiJsonValue]}
			</Title>

			<div className="flex gap-x-10 gap-y-3 flex-wrap">
				{products.map(product => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
		</section>
	);
};

export { CategorySection };
