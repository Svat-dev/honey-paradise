import { useLanguage } from "@i18n/hooks"
import type { FC } from "react"

import { Title } from "@/components/ui/common"
import type { ApiJsonValue, GetAllCatsResponse } from "@/shared/types/server"

import { ProductCard } from "./product-card/ProductCard"

interface IProps extends GetAllCatsResponse {}

const CategorySection: FC<IProps> = ({ title, slug, products }) => {
	const { locale } = useLanguage(false)

	return (
		<section className="px-6 py-3">
			<Title id={slug} size="lg" className="mb-2 font-semibold">
				{title[locale as keyof ApiJsonValue]}
			</Title>

			<div className="flex flex-wrap gap-x-10 gap-y-3">
				{products.map(product => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
		</section>
	)
}

export { CategorySection }
