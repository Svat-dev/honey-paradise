import { cacheLife, cacheTag } from "next/cache"
import { redirect, RedirectType } from "next/navigation"
import { type FC, Suspense } from "react"

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
	"use cache"
	cacheTag("product-data")
	cacheLife({ stale: 60, revalidate: 180 })

	const initialData = await productsService.getBySlug(slug)

	if (!initialData || Object.keys(initialData).length === 0) {
		redirect(EnumAppRoute.NOT_FOUND, RedirectType.replace)
	}

	return (
		<article className="px-10 py-5">
			<Title size="lg" className="mb-3 text-3xl font-semibold">
				{initialData.title[locale as keyof ApiJsonValue]}
			</Title>

			<Suspense fallback={<>Loading...</>}>
				<ProductContent initialData={initialData} slug={slug} />
			</Suspense>
		</article>
	)
}

export { Product }
