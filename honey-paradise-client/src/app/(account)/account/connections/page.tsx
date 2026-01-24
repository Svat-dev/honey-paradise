import { NO_INDEX_PAGE } from "@constants/base"
import { getMetadata } from "@utils/base"
import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { Connections } from "@/components/screens/_connections/Connections"
import type { TSearchParams } from "@/shared/types"

interface IProps {
	searchParams: Promise<TSearchParams>
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("global")

	return {
		...(await getMetadata({
			title: t("connections.title"),
			description: t("connections.description", { title: t("logo") }),
			index: false
		})),
		...NO_INDEX_PAGE
	}
}

const ConnectionsPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams

	return <Connections searchParams={searchParams} />
}

export default ConnectionsPage
