import { getTranslations } from "next-intl/server"
import type { FC } from "react"

import { Title } from "@/components/ui/common"

import { TransactionsContent } from "./components/TransactionsContent"

interface IProps {}

const Transactions: FC<IProps> = async () => {
	const t = await getTranslations("global.transactions.content")

	return (
		<article className="relative my-6 ml-10 w-full">
			<Title size="lg" className="font-bold">
				{t("title")}
			</Title>

			<p className="mb-4 ml-1 text-muted">{t("description")}</p>

			<TransactionsContent />
		</article>
	)
}

export { Transactions }
