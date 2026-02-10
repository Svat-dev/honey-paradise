import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { Orders } from "@/components/screens/_orders/Orders"
import { NO_INDEX_PAGE } from "@/shared/lib/constants/base"
import { getMetadata } from "@/shared/lib/utils/base"

interface IProps {}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("global")

	return {
		...(await getMetadata({
			title: t("orders.title"),
			description: t("orders.description", { title: t("logo") }),
			index: false
		})),
		...NO_INDEX_PAGE
	}
}

const OrdersPage: NextPage<IProps> = () => {
	return <Orders />
}

export default OrdersPage
