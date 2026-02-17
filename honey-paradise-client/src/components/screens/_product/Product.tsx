import { redirect, RedirectType } from "next/navigation"
import type { FC } from "react"

import { Title } from "@/components/ui/common"
import { productsService } from "@/services/products.service"
import { EnumAppRoute } from "@/shared/lib/constants/routes"
import type { ApiJsonValue } from "@/shared/types/server"

import { ProductContent } from "./ProductContent"

interface IProductProps {
	slug: string
	locale: string
}

const Product: FC<IProductProps> = async ({ slug, locale }) => {
	const initialData = await productsService.getBySlug(slug)

	if (!initialData || Object.keys(initialData).length === 0) {
		redirect(EnumAppRoute.NOT_FOUND, RedirectType.replace)
	}

	let currentArticle: number = -1
	if (initialData.slug_art !== -1) {
		const index = initialData.variants.findIndex(
			i => i.article === initialData.slug_art
		)

		currentArticle = initialData.variants[index === -1 ? 0 : index].article
	} else currentArticle = initialData.variants[0].article

	return (
		<article className="px-10 py-5">
			<Title size="lg" className="mb-3 text-3xl font-semibold">
				{initialData.title[locale as keyof ApiJsonValue]}
			</Title>

			<ProductContent
				initialData={initialData}
				currentArticle={currentArticle}
				slug={slug}
				locale={locale}
			/>
		</article>
	)
}

export { Product }
