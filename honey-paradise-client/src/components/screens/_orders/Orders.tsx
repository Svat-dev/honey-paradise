import { getLocale, getTranslations } from "next-intl/server"
import type { FC } from "react"

import { Title } from "@/components/ui/common"
import type { TSearchParams } from "@/shared/types"

import { OrdersContent } from "./components/OrdersContent"

interface IProps {
	searchParams: TSearchParams
}

const Orders: FC<IProps> = async ({ searchParams }) => {
	const t = await getTranslations("global.orders.content")
	const locale = await getLocale()

	return (
		<article className="relative mx-10 my-6 w-full">
			<Title size="lg" className="font-bold">
				{t("title")}
			</Title>

			<p className="mb-4 ml-1 text-muted">{t("description")}</p>

			<OrdersContent
				paid={Boolean(searchParams?.["paid"])}
				paymentId={String(searchParams?.["id"] || "")}
				locale={locale}
			/>
		</article>
	)
}

export { Orders }
