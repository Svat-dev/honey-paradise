import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { CatalogCategory } from "@/components/screens/_catalog/CatalogCategory"
import { getMetadata } from "@/shared/lib/utils/base"

interface IProps {
	params: Promise<{ slug: string }>
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
	const t = await getTranslations("global")
	const params = await props.params

	return getMetadata({
		title: t("catalog.title", { params: String(true) }),
		description: t("catalog.description", {
			title: t("logo"),
			params: String(true)
		}),
		index: true
	})
}

const CatalogCategoryPage: NextPage<IProps> = async props => {
	const params = await props.params

	return <CatalogCategory slug={params.slug} />
}

export default CatalogCategoryPage
