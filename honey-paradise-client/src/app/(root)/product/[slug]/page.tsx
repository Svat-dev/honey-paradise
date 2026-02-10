import type { Metadata, NextPage } from "next"
import { getLocale, getTranslations } from "next-intl/server"

import { Product } from "@/components/screens/_product/Product"
import { productsService } from "@/services/products.service"
import { getMetadata } from "@/shared/lib/utils/base"
import type { ApiJsonValue } from "@/shared/types/server"

interface IProps {
	params: Promise<{ slug: string }>
}

export const revalidate = 60

async function getProductData(slug: string) {
	"use server"
	const data = await productsService.getBySlug(slug)

	return data
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
	const t = await getTranslations("global")
	const locale = (await getLocale()) as keyof ApiJsonValue
	const params = await props.params

	const { title } = await getProductData(params.slug)

	if (!title) return {}

	return {
		...(await getMetadata({
			title: t("product.title", { name: title[locale] }),
			description: t("product.description", {
				name: params.slug,
				title: t("logo")
			}),
			index: true
		}))
	}
}

const ProductPage: NextPage<IProps> = async props => {
	const params = await props.params
	const locale = await getLocale()

	return <Product slug={params.slug} locale={locale} />
}

export default ProductPage
