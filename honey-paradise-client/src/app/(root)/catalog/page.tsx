import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { Catalog } from "@/components/screens/_catalog/Catalog"
import { getMetadata } from "@/shared/lib/utils/base"
import type { TSearchParams } from "@/shared/types"

interface IProps {
	searchParams: Promise<TSearchParams>
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
	const t = await getTranslations("global")
	const searchParams = await props.searchParams
	const params = searchParams.q ? searchParams.q : false

	return getMetadata({
		title: t("catalog.title", { params: String(params) }),
		description: t("catalog.description", {
			title: t("logo"),
			params: String(params)
		})
	})
}

const CatalogPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams

	return <Catalog q={searchParams.q} />
}

export default CatalogPage
