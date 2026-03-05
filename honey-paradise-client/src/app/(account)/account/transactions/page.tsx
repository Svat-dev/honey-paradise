import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { Transactions } from "@/components/screens/_transactions/Transactions"
import { NO_INDEX_PAGE } from "@/shared/lib/constants/base"
import { getMetadata } from "@/shared/lib/utils/base"

interface IProps {}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("global")

	return {
		...(await getMetadata({
			title: t("transactions.title"),
			description: t("transactions.description", { title: t("logo") }),
			index: false
		})),
		...NO_INDEX_PAGE
	}
}

const TransactionsPage: NextPage<IProps> = async () => {
	return <Transactions />
}

export default TransactionsPage
